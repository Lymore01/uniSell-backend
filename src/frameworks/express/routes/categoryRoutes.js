import e from "express";
import CategoryRepository from "../../../repositories/categories/categoryRepo.js";
import CategoryController from "../../../controllers/category/categoryController.js";
import CreateNewCategory from "../../../use-cases/categories/createCategory.js";
import DeleteCategory from "../../../use-cases/categories/deleteCategory.js";
import GetCategoryById from "../../../use-cases/categories/getCategoryById.js";
import GetAllCategories from "../../../use-cases/categories/getAllCategories.js";
const categoryRouter = e.Router();

const categoryRepo = new CategoryRepository();
const createCategory = new CreateNewCategory(categoryRepo);
const deleteCategory = new DeleteCategory(categoryRepo);
const getAllCategories = new GetAllCategories(categoryRepo);
const getCategoryById = new GetCategoryById(categoryRepo);
const categoryController = new CategoryController({
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
});

categoryRouter.post("/create", (req, res) =>
  categoryController.createCategories(req, res)
);
categoryRouter.delete("/delete/:id", (req, res) =>
  categoryController.deleteCategoryById(req, res)
);
categoryRouter.get("/all", (req, res) => categoryController.findAll(req, res));
categoryRouter.get("/:id", (req, res) => categoryController.findById(req, res));

export default categoryRouter;
