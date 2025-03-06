const express = require("express");
const router = express.Router();

const { getItems, getItem, createItem, updateItem, deleteItem, updateImage} = require("../controllers/storage");
router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);

router.patch("/", authMiddleware, uploadMiddlewareMemory.single("image"), updateImage)

module.exports = router;