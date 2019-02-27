const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  date: {
    type: String,
    default: Date.now
  },
  duration:{
    type: String,
    default: "-"
  }
});

module.exports = mongoose.model("history", historySchema);
