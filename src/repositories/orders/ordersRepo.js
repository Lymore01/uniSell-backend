import OrdersModel from "../../frameworks/database/models/order.js";

class OrderRepository {
  async save(order) {
    const ordersModel = new OrdersModel(order);
    return await ordersModel.save();
  }
}

export default OrderRepository;
