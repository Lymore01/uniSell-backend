import e from "express";
import ShopController from "../../../controllers/shop/shopsController.js";
import ShopRepository from "../../../repositories/shops/shopRepo.js";
import DeleteShop from "../../../use-cases/shops/deleteShop.js";
import GetAllShops from "../../../use-cases/shops/getAllShops.js";
import GetShopById from "../../../use-cases/shops/getShopById.js";
import GetShopByUser from "../../../use-cases/shops/getShopByUser.js";
import CreateShop from "../../../use-cases/shops/createShop.js";

const shopRouter = e.Router();

const shopRepo = new ShopRepository();
const createShop = new CreateShop(shopRepo);
const deleteShop = new DeleteShop(shopRepo);
const getAllShops = new GetAllShops(shopRepo);
const getShopById = new GetShopById(shopRepo);
const getShopByUser = new GetShopByUser(shopRepo)
const shopController = new ShopController({
  createShop,
  deleteShop,
  getAllShops,
  getShopById,
  getShopByUser
});

shopRouter.get("/all", (req, res) => shopController.getAll(req, res));
shopRouter.get("/:id", (req, res) => shopController.getById(req, res));
shopRouter.get("/user/:id", (req, res) => shopController.getShopByUserID(req, res));
shopRouter.post("/create", (req, res) => shopController.create(req, res));
shopRouter.delete("/delete/:id", (req, res) =>
  shopController.deleteShopById(req, res)
);

export default shopRouter;
