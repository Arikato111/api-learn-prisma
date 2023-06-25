import express from "express";
import { prisma } from "./main";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.status(200).json({
    statusCode: 1,
    data: users,
  });
});

app.get("/add-user", async (req, res) => {
  // simple check emty data of variables

  let u_name = req.body?.name ?? "";
  let u_address = req.body?.address ?? "";
  let u_username = req.body?.username ?? "";
  let u_password = req.body?.password ?? "";
  if (!u_name || !u_address || !u_username || !u_password) {
    res.status(200).json({
      statusCode: 0,
      msg: "Emty data (name, address, username, password)",
      body: req.body,
    });
    return;
  }
  // after checked insert data with prisma
  await prisma.users.create({
    data: {
      name: u_name,
      address: u_address,
      password: u_password,
      phone: "012932030",
      username: u_username,
    },
  });
  // send message to who that sending request
  res.status(201).json({
    statusCode: 1,
    msg: "success",
  });
});

// just a welcome message to show in home page
app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 1,
    msg: "welcome to api",
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
