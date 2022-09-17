import { Document, Types } from 'mongoose'

export interface UserInterface extends Document {
  name: string,
  email: string,
  password: string,
  tasks: Types.ObjectId[]
}