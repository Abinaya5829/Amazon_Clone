// backend/models/productModel.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    description: {
      type: String,
      required: [true, 'Please add a product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports','Accessories','Computers','Wearables', 'Other'],
      default: 'Other',
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
