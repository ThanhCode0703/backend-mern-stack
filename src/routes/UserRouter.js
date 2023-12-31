const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.post("/update-user/:id", authUserMiddleWare, userController.updateUser);
router.delete("/delete-user/:id", authMiddleware, userController.deleteUser);
// :id lấy trên đường dẫn
router.post(
  "/delete-multiple-user",
  authMiddleware,
  userController.deleteMultipleUser
);
router.get("/getAll", authMiddleware, userController.getAllUser);
router.get(
  "/get-details/:id",
  authUserMiddleWare,
  userController.getDetailsUser
);
router.post("/refresh-token", userController.refreshToken);
module.exports = router;
