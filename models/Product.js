const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    p_code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    p_name: {
      type: String,
      required: true,
      trim: true
    },
    p_price: {
      type: Number,
      required: true
    },
    p_description: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    dimension: {
      type: String
    },
    color: {
      type: String
    },
    quantity: {
      type: Number,
      default: 0
    },
    p_image: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
