const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historys");

router.get("/", historyController.get_all_historys);

// router.post("/", historyController.post_history);

module.exports = router;
