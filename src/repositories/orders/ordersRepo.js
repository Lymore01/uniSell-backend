import OrdersModel from "../../frameworks/database/models/order.js";
import Order from "../../entities/Order.js";

class OrderRepository {
  async save(order) {
    const ordersModel = new OrdersModel(order);
    return await ordersModel.save();
  }
  async delete(orderId) {
    return await OrdersModel.findOneAndDelete({ id: orderId });
  }

  async findAll() {
    const orders = OrdersModel.find();
    return orders;
  }

  async findById(orderId) {
    if (!orderId) {
      throw new Error("invalid id!");
    }
    const order = await OrdersModel.findOne({ id: orderId });
    return order ? new Order(order) : null;
  }

  async findByUser(userId){
    if (!userId) {
      throw new Error("invalid id!");
    }
    const order = await OrdersModel.findOne({ userId });
    return order ? new Order(order) : null;
  }
}

export default OrderRepository;

// ? when fetching from the db use async await 

