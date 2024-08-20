import mongoose, {Document, Schema} from "mongoose";

interface IStudent extends Document {
  name: string;
  email: string;
  age: number;
}

const studentSchema = new Schema<IStudent>({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  age: {type: Number, required: true}
})

export default mongoose.model<IStudent>('Student', studentSchema)