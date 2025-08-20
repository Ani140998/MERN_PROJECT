const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controllers")
const joiSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware")
const authMiddleware = require("../middlewares/auth-middleware");
const productControllers = require("../controllers/product-controllers");

/*-----------------------------------------------------------------
Use the express.Router class  to create modular  route handlers.
A Router instance is  a complete middleware and routing sytem; for this reason, it is often called as "mini-app".
-------------------------------------------------------------------*/


router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(joiSchema.signupSchema), authcontrollers.register);
router.route("/login").post(validate(joiSchema.loginSchema), authcontrollers.login);
router.route("/users").get(authMiddleware, authcontrollers.user);
router.route("/products").get(productControllers.allProduct);
router.route("/wishlist").post(productControllers.wishlistProduct);


module.exports = router;