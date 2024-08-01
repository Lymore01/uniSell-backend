import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shopName: {
      type: String,
      required: true,
    },
    shopCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    paymentMethod: {
      type: String,
      default: "M-pesa",
    },
    shopDescription: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Shop = mongoose.model("Shop", shopSchema);

export default Shop