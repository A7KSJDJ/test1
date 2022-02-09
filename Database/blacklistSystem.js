const { model, Schema } = require("mongoose");

module.exports = model("blacklist", new Schema({
  userID: String,
  reason: String,
  Date: String,
}))