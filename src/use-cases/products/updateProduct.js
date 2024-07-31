import Product from "../../entities/Product.js";
import GetProductById from "./getProductById.js";

class UpdateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
    this.getProductById = new GetProductById(productRepository);
  }

  async execute(prodId, updateData) {
    const existingProduct = await this.getProductById.execute(prodId);

    if (!existingProduct) {
      throw new Error(`Product with ID ${prodId} not found.`);
    }

    const updatedProduct = new Product({
      id: existingProduct.id,
      prodName: updateData.prodName || existingProduct.prodName,
      description: updateData.description || existingProduct.description,
      price: updateData.price || existingProduct.price,
      quantity: updateData.quantity || existingProduct.quantity,
      color: updateData.color || existingProduct.color,
      size: updateData.size || existingProduct.size,
      categoryId: updateData.categoryId || existingProduct.categoryId,
      image: updateData.image || existingProduct.image,
      createdAt: existingProduct.createdAt,
      updatedAt: new Date().toISOString(),
    });

    return await this.productRepository.update(prodId, updatedProduct);
  }
}

export default UpdateProduct;
