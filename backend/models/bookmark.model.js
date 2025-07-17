const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  favicon: { type: String },
  summary: { type: String },
  tags: [{ type: String }],
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);