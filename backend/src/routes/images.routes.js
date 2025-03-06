import { Router } from "express";
import upload from "../middlewares/imageUploadMiddleware.js";
import authUser from "../middlewares/authUser.middleware.js";
import uploadImageController from "../controllers/images/uploadImageController.controller.js";

const imagesRouter = Router();

imagesRouter.post(
  "/upload",
  authUser,
  upload.single("image"),
  uploadImageController
);

export default imagesRouter;
