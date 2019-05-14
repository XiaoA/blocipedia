const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const validation = require("./validation");
const wikiController = require("../controllers/wikiController");
const userController = require("../controllers/userController");
const collaboratorController = require("../controllers/collaboratorController");
const User = require("../../src/db/models").User;

router.get("/wikis/:wikiId/collaborators", collaboratorController.show);
router.post("/wikis/:wikiId/collaborators/create", collaboratorController.create);
router.post("/wikis/:wikiId/collaborators/delete", collaboratorController.delete);
module.exports = router;
