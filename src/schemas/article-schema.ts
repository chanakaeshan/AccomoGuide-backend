import { Schema, Types, model, Document } from "mongoose";
var mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Articles = mongoose.model("Articles", ArticleSchema);

export default Articles;
