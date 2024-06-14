import express from "express";
import path from 'node:path';
import session from 'express-session';
import routes from "./routes/index.js";
import dotenv from 'dotenv';
import MongoStore from "connect-mongo";
dotenv.config()

const server = express();
const port = 8000;

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, 'public')

server.use(session({
  name: "test",
  secret: "simple",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: process.env.MONGO_URL})
}))
server.use(express.static(staticPath))
server.use(express.urlencoded({extended: false}))
server.use(routes)


server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})