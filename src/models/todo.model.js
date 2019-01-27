const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

// 📝 Todo Schema definition
const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// 🔌 Create the Plugin
const plugin = new MongooseAutoIncrementID(TodoSchema, 'Todo');

// Log for the plugin
plugin.applyPlugin()
  .then(() => {
    console.log('Auto Increment for TODO Implemented!');
  })
  .catch(e => {
    console.log('An Error in AutoIncrement Plugin!');
  })

// ➕ Add the plugin to the model
TodoSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'Todo'});


module.exports = mongoose.model('Todo', TodoSchema);