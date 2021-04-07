const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const photoSchema = new Schema(
  {
    // model properties
    year: String,
    imageUrl: String,
    // userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Photo", photoSchema);
