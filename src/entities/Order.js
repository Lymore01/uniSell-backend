class Order {
  constructor({
    id,
    userId,
    shopId,
    products,
    totalPrice,
    paymentMethod,
    shippingAddress,
    orderStatus,
    createdAt,
    updatedAt,
  }) {
    (this.id = id),
      (this.userId = userId),
      (this.shopId = shopId),
      (this.products = products),
      (this.totalPrice = totalPrice),
      (this.paymentMethod = paymentMethod),
      (this.shippingAddress = shippingAddress),
      (this.orderStatus = orderStatus),
      (this.createdAt = createdAt),
      (this.updatedAt = updatedAt);
  }
}


export default Order;

// shop id and user id references
