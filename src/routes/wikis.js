const express = require("express");
const router = express.Router();

const wikiController = require("../controllers/wikiController")
const validation = require("./validation");

router.get("/wikis", wikiController.index);
router.get("/wikis/new", wikiController.new);
router.post("/wikis/create", validation.validateWikis, wikiController.create);

module.exports = router;