const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "content": { type: String, default: '' },
  "published_at": { type: Date, default: Date.now },
});

const AnnounceModel = mongoose.model(
  "Announcement",
  schema,
  "Announcements"
);

module.exports = AnnounceModel;
