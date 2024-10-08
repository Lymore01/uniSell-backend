class GetAllOrders {
    constructor(orderRepository){
        this.orderRepository = orderRepository
    }

    async execute(){
        return await this.orderRepository.findAll()
    }
}

export default GetAllOrders