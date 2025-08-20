const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema({

    user_id:{type:String, required: true},
    product_id:{type:String, required: true}

});

const Wishlist = new model("Wishlist", wishlistSchema);
module.exports = Wishlist;