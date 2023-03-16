const express = require("express")
const { getItems, createItem, deleteItem, updateItem, getItem } = require("../controllers/movies")
const router = express.Router()

router.get("/:id", getItem)
router.get("/", getItems)
router.post("/", createItem)
router.delete("/:id", deleteItem)
router.put("/:id", updateItem)

module.exports = router
