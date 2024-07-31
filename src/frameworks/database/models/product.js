import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String },
    prodName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    color: { type: String },
    size: { type: String },
    categoryId: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Products = mongoose.model("Product", productSchema);

export default Products;
