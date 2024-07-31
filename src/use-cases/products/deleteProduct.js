import GetProductById from "./getProductById.js";

class DeleteProductById {
  constructor(productRepository) {
    this.productRepository = productRepository;
    this.getProductById = new GetProductById({ productRepository });
  }

  async execute(prodId) {
    const product = await this.getProductById.execute(prodId);
    if(!product){
      throw new Error(`Product with ID ${prodId} not found`)
    }
    return await this.productRepository.delete(product);
  }
}

export default DeleteProductById;
