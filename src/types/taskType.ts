import { Document, Types } from 'mongoose'

export interface TaskInterface extends Document {
  time: Date,
  description: string,
  type: string,
  completed: boolean,
  user: Types.ObjectId[]
}