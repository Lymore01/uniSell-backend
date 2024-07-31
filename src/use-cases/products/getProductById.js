class GetProductById {
    constructor(productRepository){
        this.productRepository = productRepository
    }

    async execute(prodId){
        const product = await this.productRepository.findById(prodId)
        return product
    }
}

export default GetProductById

