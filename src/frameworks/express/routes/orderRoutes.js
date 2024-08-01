import e from "express";
import OrderRepository from "../../../repositories/orders/ordersRepo.js";
import CreateOrder from "../../../use-cases/orders/createOrder.js";
import OrdersController from "../../../controllers/order/ordersController.js";

const orderRouter = e.Router();

const orderRepo = new OrderRepository();
const createOrder = new CreateOrder(orderRepo);
const ordersController = new OrdersController({
  createOrder,
});

orderRouter.post("/create-order", (req, res) =>
  ordersController.create(req, res)
);

export default orderRouter;

// import everything : repos, controllers, use cases
