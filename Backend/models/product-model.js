const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: String, required: true},
    stock: {type: String, required: true},
    brand: {type: String, required: true},
    rating: {type: String, required: true},
    description: {type: String, required: true},
    provider: {type: String, required: true}
  

});

const Product = new model("Product", productSchema);
module.exports = Product;