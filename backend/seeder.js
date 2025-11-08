import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const products = [
  {
    name: "Wireless Headphones",
    image: "../frontend/images/wireless-headphones.jpg",
    description: "High-quality wireless headphones with noise cancellation.",
    brand: "Sony",
    category: "Electronics",
    price: 199.99,
    countInStock: 15,
  },
  {
    name: "Smart Watch",
    image: "../frontend/images/smart-watch.jpg",
    description: "Waterproof smartwatch with fitness tracking features.",
    brand: "Apple",
    category: "Electronics",
    price: 299.99,
    countInStock: 10,
  },
  {
    name: "Gaming Laptop",
    image: "../frontend/images/gaming-laptop.jpg",
    description: "Powerful laptop with RTX 4060 GPU for gaming and work.",
    brand: "ASUS",
    category: "Computers",
    price: 1299.99,
    countInStock: 5,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Sample Products Inserted!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
