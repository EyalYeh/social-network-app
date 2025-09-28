const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { upload } = require("../middleware/upload");


const { upload } = require("../middleware/upload");


router.get("/", authController.getUsers);
router.post("/signup", upload.single("avatar"), authController.signup);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);

module.exports = router;
