const express = require("express");
const auth = require("../middlewares/auth");
const authController = require("../controller/authController");
const complaintController = require("../controller/complaintController");
const replyController = require("../controller/replyController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("hello");
});
// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Logout
router.post("/logout", auth, authController.logout);

// RefreshToken
router.get("/refresh", auth, authController.refresh);

// Complaint

// Create Complain
router.post("/complaint", auth, complaintController.create);

// Get All Complain
router.get("/complaint/all", auth, complaintController.getAll);

// Get Complain by Id
router.get("/complaint/:id", auth, complaintController.getById);

// Update Complain
router.put("/complaint", auth, complaintController.update);

// Delete Complain
router.delete("/complaint/:id", auth, complaintController.delete);

/**
 * Reply
 *
 * Create Reply
 */

router.post("/reply", auth, replyController.create);

// Get Reply
router.get("/reply/:id", auth, replyController.getById);

module.exports = router;
