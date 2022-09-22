import mongoose, { model } from 'mongoose';
import { UserInterface } from '../../types/userType';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHashed: { type: String, required: true },
  tasks: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Task' }]
});

export default model<UserInterface>('User', userSchema);

// import mongoose from 'mongoose';
// // const mongoose = require('mongoose');
// // const uniqueValidator = require('mongoose-unique-validator');

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true, minlength: 6 },
//   image: { type: String, required: true },
//   places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
// });

// // userSchema.plugin(uniqueValidator);

// export default mongoose.model('User', userSchema);