let express = require("express");
let router = express.Router();

const WebhookController = require("../controllers/webhook_controller");

router.post("/webhook", WebhookController.ChatAI);

module.exports = router;