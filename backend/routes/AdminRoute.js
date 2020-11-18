const express = require("express");
const admin = require("../controllers/admin.controller");
const router = express.Router();

const { authMiddleware } = require("../controllers/admin.controller");

router.post("/register", admin.register);

router.post("/login", admin.login);

router.get("/profile", authMiddleware, function (req, res) {
  res.json({ access: true });
});

module.exports = router;
