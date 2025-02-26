import { Router } from "express";
import registerUserController from "../controllers/users/registerUserController.controller.js";
import loginUserController from "../controllers/users/loginUsuarioController.controller.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);

export default userRouter;
