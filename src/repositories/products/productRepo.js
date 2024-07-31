import ProductModel from "../../frameworks/database/models/product.js";
import Product from "../../entities/Product.js";

class ProductRepo {
  async save(product) {
    const productModel = new ProductModel(product);
    return await productModel.save();
  }

  async findAll() {
    const productModels = ProductModel.find();
    return productModels
  }

  async findById(prodId) {
    const productModel = await ProductModel.findOne({ id: prodId });
    return productModel ? new Product(productModel) : null;
    // we create a new product instance so that when we want to act upon the data we can just declare more methods in the class
  }

  async delete(prodId) {
    ProductModel.findOneAndDelete({ prodId });
    return true;
  }

  async update(prodId, updatedProduct) {
    const productModel = await ProductModel.findOneAndUpdate(
      { id: prodId },
      {
        $set: updatedProduct,
      },
      {
        new: true,
      }
    );
    if (!productModel) {
      throw new Error(`Product with ID ${prodId} not found.`);
    }
    return productModel;
  }
}
export default ProductRepo;

