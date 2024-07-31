import Product from "../../entities/Product.js";

class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    const product = new Product({
      id: productData.id,
      prodName: productData.prodName,
      description: productData.description,
      price: productData.price,
      quantity: productData.quantity,
      color: productData.color,
      size: productData.size,
      categoryId: productData.categoryId,
      image: productData.image,
    });
    return await this.productRepository.save(product);
  }
}

export default CreateProduct;
