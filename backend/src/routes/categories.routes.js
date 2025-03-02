import { Router } from "express";
import createCategoryController from "../controllers/categories/createCategoryController.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import getCategoriesController from "../controllers/categories/getCategoriesController.controller.js";
import editCategoryController from "../controllers/categories/editCategoryController.controller.js";
import deleteCategoryController from "../controllers/categories/deleteCategoryContoller.controller.js";

const categoriesRouter = Router();

categoriesRouter.post("/", authUser, createCategoryController);
categoriesRouter.get("/", authUser, getCategoriesController);
categoriesRouter.put("/:id", authUser, editCategoryController);
categoriesRouter.delete("/:id", authUser, deleteCategoryController);

export default categoriesRouter;
