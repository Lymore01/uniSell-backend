class DeleteOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId) {
    return await this.orderRepository.delete(orderId);
  }
}

export default DeleteOrder;
