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
  async deleteOrders(req, res) {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).json({ message: "invalid id!" });
      }
      const order = this.deleteOrder.execute(id);
      if (!order) {
        res.status(400).json({ message: "Error deleting order!" });
      } else {
        res.status(200).json({ message: `${id} deleted`, order });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async listAllOrders(req, res) {
    try {
      const orders = await this.getAllOrders.execute();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).json({ message: "invalid id!" });
      }
      const order = await this.getOrderById.execute(id);
      if (!order) {
        res.status(400).json({ message: "Error fetching order!" });
      } else {
        res.status(200).json({ message: `success`, order });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findOrderByUser(req, res) {
    const { userId } = req.params;
    try {
      if (!userId) {
        res.status(400).json({ message: "invalid id!" });
      }
      const order = await this.getOrderByUser.execute(userId);
      if (!order) {
        res.status(400).json({ message: "Error fetching order!" });
      } else {
        res.status(200).json({ message: `Order for ${userId}`, order });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default OrdersController;

// controller takes in use cases
