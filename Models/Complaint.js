import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  description: String,
  complaintType: String,
  location: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  status: { type: String, default: "Pending" },
  file: String,
  createdAt: { type: Date, default: Date.now },
});

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
