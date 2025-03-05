import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import routesRouter from "./routes/routes.routes.js";

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use(fileUpload());

server.use(routesRouter);

server.use((error, req, res, next) => {
  console.log("Error al iniciar la aplicación", error);

  res.status(res.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

server.use((req, res) => {
  res.status(404).send({
    status: "route error!",
    message: "Not found",
  });
});

export default server;
