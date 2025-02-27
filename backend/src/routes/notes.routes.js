import { Router } from "express";
import createNoteController from "../controllers/notes/createNoteController.controller.js";
import getNotesController from "../controllers/notes/getNotesController.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import getNotesByUserController from "../controllers/notes/getNotesByUserController.controller.js";
import getNoteByIdController from "../controllers/notes/getNoteByIdController.controller.js";

const notesRouter = Router();

notesRouter.post("/", createNoteController);
notesRouter.get("/allnotes", getNotesController);
notesRouter.get("/mynotes", authUser, getNotesByUserController);
notesRouter.get("/:id", authUser, getNoteByIdController);

export default notesRouter;
