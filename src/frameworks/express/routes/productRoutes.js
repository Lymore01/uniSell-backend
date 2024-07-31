import e from "express";
import bodyParser from "body-parser";
import ProductController from "../../../controllers/productsController.js";
import ProductRepo from "../../../repositories/products/productRepo.js";
import CreateProduct from "../../../use-cases/products/createProduct.js";
import DeleteProductById from "../../../use-cases/products/deleteProduct.js";

import GetAllProducts from "../../../use-cases/products/getAllProducts.js";
import GetProductById from "../../../use-cases/products/getProductById.js";
import UpdateProduct from "../../../use-cases/products/updateProduct.js";

const userRouter = e.Router();

userRouter.use(bodyParser.json())


const productRepo = new ProductRepo();
const createProduct = new CreateProduct(productRepo);
const deleteProduct = new DeleteProductById(productRepo);
const getAllProducts = new GetAllProducts(productRepo);
const getProductById = new GetProductById(productRepo);
const updateProduct = new UpdateProduct(productRepo);
const productsController = new ProductController({
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
});



userRouter.post("/create-product", (req, res) => productsController.create(req,res))
userRouter.get("/all", (req, res) => productsController.listAllProducts(req,res))
userRouter.delete("/delete/:id", (req, res) => productsController.deleteProducts(req,res))
userRouter.get("/:id", (req, res) => productsController.getProductByIds(req,res))
userRouter.put("/update/:id", (req, res) => productsController.updateProductById(req,res))



export default userRouter


