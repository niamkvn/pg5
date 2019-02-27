const Telegram = require("telegram-node-bot");
class pingController extends Telegram.TelegramBaseController {
  otherwiseController($){
      $.sendMessage("Maaf, saya tidak mengerti");
  }
}

module.exports = otherwiseController;    