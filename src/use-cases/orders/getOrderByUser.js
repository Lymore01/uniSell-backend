class GetOrderByUser{
    constructor(orderRepository){
        this.orderRepository = orderRepository
    }

    async execute(userId){
        return await this.orderRepository.findByUser(userId)
    }
}

export default GetOrderByUser