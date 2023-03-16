const express = require("express")
const { getItems, getItem } = require("../controllers/genres")
const router = express.Router()

router.get("/:id", getItem)
router.get("/", getItems)

module.exports = router
