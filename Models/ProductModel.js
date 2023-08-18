const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price:{ type: Number,required: false }   ,
  category: { type: String, required: true },
  quantity:{type:Number,required:false},
  unit:{type:String,required:false},
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;