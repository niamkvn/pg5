const Telegram = require("telegram-node-bot");
class pingController extends Telegram.TelegramBaseController {
  pingHandler($) {
    $.sendMessage("pong");
  }

  get routes() {
    return {
      pingCommand: this.pingHandler
    };
  }
}

module.exports = pingController;