const express = require("express");

const router = express.Router();

const {
  createItem,
  getItems,
  getItemById,
  getMyItems,
  deleteItem
} = require("../controllers/itemController");

router.post("/create", createItem);

router.get("/", getItems);

router.get("/my-items/:userId",getMyItems);

router.get("/:id", getItemById);

router.delete("/:id",deleteItem);

module.exports = router;