import e from "express";
import OrderRepository from "../../../repositories/orders/ordersRepo.js";
import CreateOrder from "../../../use-cases/orders/createOrder.js";
import DeleteOrder from "../../../use-cases/orders/deleteOrder.js";
import GetAllOrders from "../../../use-cases/orders/getAllOrders.js";
import GetOrderByID from "../../../use-cases/orders/getOrderById.js";
import GetOrderByUser from "../../../use-cases/orders/getOrderByUser.js";
import OrdersController from "../../../controllers/order/ordersController.js";

const orderRouter = e.Router();

const orderRepo = new OrderRepository();
const createOrder = new CreateOrder(orderRepo);
const deleteOrder = new DeleteOrder(orderRepo);
const getAllOrders = new GetAllOrders(orderRepo);
const getOrderById = new GetOrderByID(orderRepo);
const getOrderByUser = new GetOrderByUser(orderRepo);
const ordersController = new OrdersController({
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrderByUser,
});

orderRouter.post("/create-order", (req, res) =>
  ordersController.create(req, res)
);
orderRouter.delete("/delete/:id", (req, res) =>
  ordersController.deleteOrders(req, res)
);
orderRouter.get("/all", (req, res) => ordersController.listAllOrders(req, res));
orderRouter.get("/:id", (req, res) => ordersController.getById(req, res));
orderRouter.get("/user/:userId", (req, res) =>
  ordersController.findOrderByUser(req, res)
);

export default orderRouter;

// import everything : repos, controllers, use cases
// for advanced query use aggregation pipeline
