import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    productImage: {
      type: String,
    },
    stock:{
        type:Number,
        default:0
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
