const Telegram = require("telegram-node-bot");
const tg = new Telegram("YOUR_TOKEN", {
  workers: 1
});
const pingController = require("./controllers/ping")
const otherwiseController = require("./controllers/otherwise")


tg.router.when(
  new Telegram.TextCommand("/ping", "pingCommand"),
  new pingController()
).otherwise(new otherwiseController());
