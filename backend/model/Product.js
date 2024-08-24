const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { type: Number },
  className: { type: String },
  title: { type: String },
  price: { type: Number },
  rating: { type: Number },
  img: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
