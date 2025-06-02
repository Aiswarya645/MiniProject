import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  address: { type: String }, 
  idProof: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now }
});


const User=mongoose.model('User', userSchema);
export default User
