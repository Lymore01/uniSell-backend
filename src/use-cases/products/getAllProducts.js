class GetAllProducts {
    constructor( productRepository ){
        this.productRepository = productRepository
    }

    async execute(){
        return await this.productRepository.findAll()
    }
}

export default GetAllProducts

// will interact with the repo