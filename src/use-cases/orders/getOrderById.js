class GetOrderByID{
    constructor(orderRepository){
        this.orderRepository = orderRepository
    }

    async execute(orderId){
        return this.orderRepository.findById(orderId)
    }
}

export default GetOrderByID