import { Router } from "express";
import createNoteController from "../controllers/notes/createNoteController.controller.js";
import getNotesController from "../controllers/notes/getNotesController.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import getNotesByUserController from "../controllers/notes/getNotesByUserController.controller.js";
import getNoteByIdController from "../controllers/notes/getNoteByIdController.controller.js";
import editNoteController from "../controllers/notes/editNoteController.controller.js";
import deleteNoteController from "../controllers/notes/deleteNoteController.controller.js";
import addImageToNoteController from "../controllers/images/addImageToNoteController.controller.js";
import upload from "../middlewares/imageUploadMiddleware.js";

const notesRouter = Router();

notesRouter.post("/", createNoteController);
notesRouter.get("/allnotes", getNotesController);
notesRouter.get("/mynotes", authUser, getNotesByUserController);
notesRouter.get("/:id", authUser, getNoteByIdController);
notesRouter.put("/:id", authUser, editNoteController);
notesRouter.delete("/:id", authUser, deleteNoteController);
notesRouter.put(
  "/:id/image",
  authUser,
  upload.single("image"),
  addImageToNoteController
);

export default notesRouter;
