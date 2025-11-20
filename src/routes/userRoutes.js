const express = require("express");
const router = express.Router();

const { authenticate, isAdmin } = require("../middleware/auth");
const { listUsers, getUserDetails } = require("../controllers/userController");

router.get("/", authenticate, isAdmin, listUsers);

router.get("/:id", authenticate, getUserDetails);

module.exports = router;
