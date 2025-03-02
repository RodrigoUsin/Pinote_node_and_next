import getCategoriesService from "../../services/categories/getCategoryService.service.js";

const getCategoriesController = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();
    res.send({
      status: "ok",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export default getCategoriesController;
