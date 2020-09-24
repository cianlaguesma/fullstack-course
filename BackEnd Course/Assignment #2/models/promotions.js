const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const promotionSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
    required: true,
  },
  price: {
    type: Currency,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    required: true,
  },
});

var Promotions = mongoose.model("Promotion", promotionSchema);
module.exports = Promotions;
