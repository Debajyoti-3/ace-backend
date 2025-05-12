import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  orderAmount: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    productPrice: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: {
      type: [orderItemSchema],
    },
    status:{
        type:String,
        enum:["PENDING", "CANCELLED", "DELIVERED"], // enum means choices
        default:"PENDING"
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
