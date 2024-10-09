const express = require("express");
const router = express.Router();

const LoginController = require("../controller/LooginController");

router.post('/register', LoginController.Register );
router.post('/login', LoginController.Login)

module.exports = router;