const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  username: String,
  email: String,
  password: String,
  avatar: String
}, { timestamps: true } )

mongoose.model('users', userSchema,)
