const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controllers")
const zodSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware")

/*-----------------------------------------------------------------
Use the express.Router class  to create modular  route handlers.
A Router instance is  a complete middleware and routing sytem; for this reason, it is often called as "mini-app".
-------------------------------------------------------------------*/

router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(zodSchema.signupSchema), authcontrollers.register);
router.route("/login").post(validate(zodSchema.loginSchema), authcontrollers.login);


module.exports = router;