import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  time: { type: Date, required: true },
  description: { type: String, required: true },
  type: { type: String }
});

export default mongoose.model('Task', taskSchema);
