import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    id: { type: String, unique:true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true, default: "M-pesa" },
    shippingAddress: { type: String },
    orderStatus: { type: Boolean },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Orders = mongoose.model("Orders", ordersSchema);

export default Orders;
