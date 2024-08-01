import Order from "../../entities/Order.js";

class CreateOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderData) {
    const order = new Order({
      id: orderData.id,
      userId: orderData.userId,
      shopId: orderData.shopId,
      products: orderData.products,
      totalPrice: orderData.totalPrice,
      paymentMethod: orderData.paymentMethod,
      shippingAddress: orderData.shippingAddress,
      orderStatus: orderData.orderStatus,
    });

    return this.orderRepository.save(order)
  }
}

export default CreateOrder;

// takes the repo as a parameter
