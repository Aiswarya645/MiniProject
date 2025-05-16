import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  
    unique: true
  },
  mobile: { type: String, required: true },
  dob: {
     type: Date,
      required: true },
       userType: {
    type: String, 
    enum: ['user', 'admin'],  
    default: 'user'           
  },
  
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User=mongoose.model('User', userSchema);
export default User
