const express = require("express");
const user = require("../controllers/UserController");
const router = express.Router();

const { authMiddleware } = require("../controllers/UserController");

router.post("/register", user.register);

router.post("/login", user.login);

router.get("/profile", authMiddleware, function (req, res) {
  res.json({ access: true });
});

router.get("/profile/:id", user.findById);

router.get("/getAllUsers", user.getAllUsers);

router.delete("/:id", user.removeById);

router.put("/:id", user.updateById);

module.exports = router;
