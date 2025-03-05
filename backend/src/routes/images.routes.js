import { Router } from "express";
import authUser from "../middlewares/authUser.middleware.js";
import uploadImageController from "../controllers/images/uploadImageController.controller.js";
import upload from "../middlewares/imageUploadMiddleware.js";

const imagesRouter = Router();

//imagesRouter.post("/upload", authUser, upload, uploadImageController);
imagesRouter.post("/upload", authUser, uploadImageController);

export default imagesRouter;
