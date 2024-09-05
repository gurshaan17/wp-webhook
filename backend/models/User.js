const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

module.exports = mongoose.model('User', UserSchema);