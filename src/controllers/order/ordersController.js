class OrdersController {
  constructor({
    createOrder,
    deleteOrder,
    getAllOrders,
    getOrderById,
    getOrderByUser,
    getOrderStatus,
  }) {
    this.createOrder = createOrder;
    this.deleteOrder = deleteOrder;
    this.getAllOrders = getAllOrders;
    this.getOrderById = getOrderById;
    this.getOrderByUser = getOrderByUser;
    this.getOrderStatus = getOrderStatus;
  }

  async create(req, res) {
    try {
      const orderData = {
        id: Date.now().toString(),
        userId: req.body.userId,
        shopId: req.body.shopId,
        products: req.body.products,
        totalPrice: req.body.totalPrice,
        paymentMethod: req.body.paymentMethod,
        shippingAddress: req.body.shippingAddress,
        orderStatus: req.body.orderStatus,
      };
      const order = await this.createOrder.execute(orderData);
      res.status(201).json({ message: "Order Created", order });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }
}

export default OrdersController;

// controller takes in use cases
