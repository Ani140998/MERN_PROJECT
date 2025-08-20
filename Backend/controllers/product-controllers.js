// ------------------- Get Products ---------------------- //
const Product = require("../models/product-model");
const Wishlist = require("../models/whishlist-model");


const allProduct = async (req, res) => {
    try {
        const response = await Product.find();
        if(!response){
            return res.status(400).json({Products: 'Not able to fetch products'})
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(`Products: ${error}`);
    }
}


const wishlistProduct = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        const wishlistCreated = await Wishlist.create({ user_id, product_id});

        res.status(200).json(wishlistCreated);

    } catch (error) {
        console.log(`Wishlist: ${error}`);
    }
}

module.exports = { allProduct, wishlistProduct };