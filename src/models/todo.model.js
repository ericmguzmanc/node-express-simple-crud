let mongoose = require('mongoose');

// 📝 Todo Schema definition
let TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model('Todo', TodoSchema);