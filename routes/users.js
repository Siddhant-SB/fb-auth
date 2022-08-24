const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://localhost/fb');
const userSchema = mongoose.Schema({
  username : String,
  name : String,
  email : String,
  password :String
});
userSchema.plugin(plm)
module.exports = mongoose.model('users', userSchema)