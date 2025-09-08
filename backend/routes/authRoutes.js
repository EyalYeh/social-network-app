const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.getUsers);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);


module.exports = router;