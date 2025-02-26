import { Router } from "express";
import createNoteController from "../controllers/notes/createNoteController.controller.js";
import getNotesController from "../controllers/notes/getNotesController.controller.js";

const notesRouter = Router();

notesRouter.post("/", createNoteController);
notesRouter.get("/allnotes", getNotesController);

export default notesRouter;
