class ProductController {
  constructor({
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
  }) {
    this.createProduct = createProduct;
    this.deleteProduct = deleteProduct;
    this.getAllProducts = getAllProducts;
    this.getProductById = getProductById;
    this.updateProduct = updateProduct;
  }

  async create(req, res) {
    try {
      // !when i use sample data it works
      
      console.log(req.body)
      const productData = {
        id: Date.now().toString(),
        prodName: req.body.prodName,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        color: req.body.color,
        size: req.body.size,
        categoryId: req.body.categoryId,
        image: req.body.image,
      };
      const product = await this.createProduct.execute(productData);
      res.status(201).json({ message: "Product Created", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }

  async listAllProducts(req, res) {
    try {
      const products = await this.getAllProducts.execute();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await this.getProductById.execute(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await this.deleteProduct.execute(id);
      if (!product) {
        res.status(400).json({ message: "Error deleting product" });
      } else {
        res
          .status(200)
          .json({ message: `${product.prodName} deleted`, product });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProductById(req, res) {
    try {
      const { id } = req.params;
      console.log(req.body); // Log the incoming request body

      const productData = {
        prodName: req.body.prodName,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        color: req.body.color,
        size: req.body.size,
        categoryId: req.body.categoryId,
        image: req.body.image,
      };

      // Check for required fields
      if (!productData.prodName || !productData.price) {
        return res
          .status(400)
          .json({ message: "prodName and price are required" });
      }

      const product = await this.updateProduct.execute(id, productData);
      if (product) {
        res
          .status(200)
          .json({ message: `${product.prodName} updated`, product });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
