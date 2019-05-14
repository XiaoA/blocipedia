const express = require("express");
const router = express.Router();
const helper = require ("../auth/helpers");
const wikiController = require("../controllers/wikiController")
const validation = require("./validation");

router.get("/wikis", wikiController.index);
router.get("/wikis/private", wikiController.privateIndex);
router.get("/wikis/new", wikiController.new);
router.get("/wikis/:id", wikiController.show);
router.get("/wikis/:id/edit", validation.validateWikis, wikiController.edit);
router.post("/wikis/create", validation.validateWikis, wikiController.create);
router.post("/wikis/:id/destroy", helper.ensureAuthenticated,wikiController.destroy);
router.post("/wikis/:id/update", wikiController.update);

module.exports = router; 