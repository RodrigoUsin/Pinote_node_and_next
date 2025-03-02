import { Router } from "express";
import userRouter from "./users.routes.js";
import notesRouter from "./notes.routes.js";
import categoriesRouter from "./categories.routes.js";
import imagesRouter from "./images.routes.js";

const routesRouter = Router();

routesRouter.use("/users", userRouter);
routesRouter.use("/notes", notesRouter);
routesRouter.use("/categories", categoriesRouter);
routesRouter.use("/images", imagesRouter);

export default routesRouter;
