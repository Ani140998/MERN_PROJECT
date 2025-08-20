const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin-controllers");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.route("/users").get(authMiddleware, adminMiddleware, adminControllers.getAllUsers);
router.route("/user/delete/:id").delete(authMiddleware, adminMiddleware, adminControllers.deleteUser)

module.exports = router;