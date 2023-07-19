import express, { Request, Response, NextFunction } from "express";
import { prisma } from "./main";
import cors from "cors";
import { SHA256 } from "crypto-js";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.raw());
app.use(bodyParser.json());

// handle error syntax
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      stausCode: 0,
      msg: "error json syntax",
    });
  }
  next();
});

app.get("/user", async (req, res) => {
  const users = await prisma.users.findMany();
  res.status(200).json({
    statusCode: 1,
    data: users,
  });
});

app.post("/user", async (req, res) => {
  // simple check emty data of variables

  let u_name = req.body?.name ?? "";
  let u_address = req.body?.address ?? "";
  let u_username = req.body?.username ?? "";
  let u_password = req.body?.password ?? "";
  let u_phone = req.body?.phone ?? "";
  if (!u_name || !u_address || !u_username || !u_password || !u_phone) {
    return res.status(200).json({
      statusCode: 0,
      msg: "Emty data (name, address, phone, username, password)",
    });
  }
  let findUser = await prisma.users.findFirst({
    where: { username: u_username },
  });
  if (findUser)
    return res.json({
      statusCode: 0,
      msg: "username has already used",
    });
  // after checked insert data with prisma
  await prisma.users.create({
    data: {
      name: u_name,
      address: u_address,
      password: SHA256(u_password).toString(),
      phone: u_phone,
      username: u_username,
    },
  });
  // send message to who that sending request
  res.status(201).json({
    statusCode: 1,
    msg: "success",
  });
});

app.put("/user", async (req, res) => {
  // simple check emty data of variables

  let u_name = req.body?.name ?? "";
  let u_address = req.body?.address ?? "";
  let u_username = req.body?.username ?? "";
  let u_password = req.body?.password ?? "";
  let u_phone = req.body?.phone ?? "";
  // check username
  if (!u_username) {
    return res.status(200).json({
      statusCode: 0,
      msg: "emty username",
    });
  }
  // check username has already used?
  let findUser = await prisma.users.findFirst({
    where: { username: u_username },
  });
  if (!findUser)
    return res.json({
      statusCode: 0,
      msg: "not found user",
    });

  // check data to update
  const data: { [key: string]: string } = {};
  if (u_name) data["name"] = u_name;
  if (u_address) data["address"] = u_address;
  if (u_phone) data["phone"] = u_phone;
  if (u_password) data["password"] = SHA256(u_password).toString();

  let userUpdated = await prisma.users.update({
    where: { username: u_username },
    data: data,
  });
  // send message to who that sending request
  res.status(201).json({
    statusCode: 1,
    msg: "update success",
    user: userUpdated,
  });
});

// just a welcome message to show in home page
app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 1,
    msg: "welcome to api",
  });
});

app.delete("/user", async (req, res) => {
  let id = `${req.query?.id}` ?? "";
  if (!id || id.length !== 24) {
    return res.json({
      statusCode: 0,
      msg: "error id",
    });
  }
  let data = await prisma.users.delete({ where: { id: id } });
  res.json({
    statusCode: 1,
    data: data,
  });
});

// when not found any api
app.all("*", (req, res) => {
  res.status(200).json({
    statusCode: 0,
    msg: "Bad request",
  });
});

export default app;
