import express from "express";
import { prisma } from "./main";
const app = express();

app.get("/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.status(200).json({ users });
});

app.get("/add-user", async (req, res) => {
  // simple check emty data of variables
  if (!req.query.name || !req.query.address || !req.query.username) {
    res.status(200).json({
      statusCode: 0,
      msg: "emty data (name, address, username)",
    });
    return;
  }
  // after checked insert data with prisma
  await prisma.users.create({
    data: {
      name: req.query.name?.toString() ?? "",
      address: req.query.address?.toString() ?? "",
      password: "111",
      phone: "012932030",
      username: req.query.username?.toString() ?? "",
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
