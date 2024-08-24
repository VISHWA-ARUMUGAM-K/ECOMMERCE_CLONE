const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const thingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: User },
    id: { type: Number },
    className: { type: String },
    title: { type: String },
    price: { type: Number },
    rating: { type: Number },
    img: { type: String },
  },
  { timestamps: true }
);

thingSchema.plugin(autoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_sequence: 500,
});

module.exports = mongoose.model("Thing", thingSchema);
