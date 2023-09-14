const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create", ProductController.createProduct);
router.put("/update/:id", authMiddleware, ProductController.updateProduct);
router.delete(
  "/delete-user/:id",
  authMiddleware,
  ProductController.deleteProduct
);
router.get("/getAll", ProductController.getAllProduct);
router.get("/get-details/:id", ProductController.getDetailsProduct);

module.exports = router;
