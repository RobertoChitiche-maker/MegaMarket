const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getCategories);

router.post("/", authMiddleware, adminMiddleware, createCategory);

router.put("/:id", authMiddleware, adminMiddleware, updateCategory);

router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;