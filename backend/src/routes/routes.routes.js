import { Router } from "express";
import userRouter from "./users.routes.js";
import notesRouter from "./notes.routes.js";

const routesRouter = Router();

routesRouter.use("/users", userRouter);
routesRouter.use("/notes", notesRouter);

export default routesRouter;
