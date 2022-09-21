import mongoose from 'mongoose';
import { TaskInterface } from '../../types/taskType';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  time: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model<TaskInterface>('Task', taskSchema);