
import Complaint from "../Models/Complaint.js";
import User from "../Models/Register.js"; // Capitalized correctly

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Feedback from '../models/Feedback.js';


export const create= async (req, res) => {
  try {
    // Assuming you have auth middleware that sets req.user with logged-in user data
    const userId = req.user._id;

    // Validate required fields here as needed

    const complaint = new Complaint({
      description: req.body.description,
      complaintType: req.body.complaintType,
      location: req.body.location,
      file: req.body.file,
      userId: userId, // <-- Save userId here!
    });

    await complaint.save();

    res.status(201).json({ message: "Complaint created successfully", complaint });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ message: "Failed to create complaint" });
  }
};



import mongoose from 'mongoose';


export const addimage = async (req, res) => {
  try {
    const { userId, description, complaintType, location } = req.body;
    const filePath = req.file?.filename || "";

    // Ensure userId exists
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found with this ID" });
    }

    // Save complaint with correctly formatted userId
    const newComplaint = new Complaint({
      description,
      complaintType,
      location,
      file: filePath,
      userId: user._id, // Directly reference the found user
    });

    const savedComplaint = await newComplaint.save();
    
    res.status(201).json({ success: true, data: savedComplaint });
  } catch (error) {
    console.error("❌ Error adding complaint:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};



export const views = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const register = async (req, res) => {
  try {
    console.log("📝 Received registration request:", req.body);

    if (!req.body.name || !req.body.email || !req.body.password || !req.body.mobile) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(" Hashed Password:", hashedPassword);

    // Set role to "user" by default (admins should be created separately)
    const userData = { ...req.body, password: hashedPassword, role: "user" };

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    console.log(" User registered successfully:", savedUser);

    res.status(201).json({ success: true, userId: savedUser._id, userType: savedUser.role });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "An error occurred during registration" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request with email:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'abc', 
      { expiresIn: '1d' }
    );

    console.log(" Login successful for user:", email);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: jwt.sign({ id: user._id, role: user.role }, 'abc', { expiresIn: '1d' }),              
      userId: user._id,
      userType: user.role,
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
};
export const getUserComplaints = async (req, res) => {
  try {
    const { userId } = req.params;
    const complaints = await Complaint.find({ user: userId });

    if (!complaints) {
      return res.status(404).json({ message: 'No complaints found for this user' });
    }

    res.status(200).json({ complaints });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user complaints', error });
  }
};
export const resolveComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status: "Resolved" },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Error resolving complaint", error });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findByIdAndDelete(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting complaint', error });
  }
};

export const complaint = async (req, res) => {
  try {
    const { description, complaintType, location, userId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newComplaint = new complaintModel({
      description,
      complaintType,
      location,
      proof: file.filename,
      userId,
    });

    const savedComplaint = await newComplaint.save();

    res.status(201).json({
      message: "Complaint saved successfully",
      complaint: savedComplaint,
    });
  } catch (error) {
    console.error("Error in complaint submission:", error);
    res.status(500).json({ error: "Server error" });
  }
};
export const myComplaints = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    const complaints = await Complaint.find({ userId }).sort({ createdAt: -1 });

    
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user complaints" });
  }
};


export const viewComplaints = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await complaintModel.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ data: complaint });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { userId, fullName, mobile, email, dob, state, district, address, idProof, idProofNumber } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: fullName, 
        mobile,
        email,
        dob,
        state,
        district,
        address,
        idProof,
        idProofNumber,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Profile updated successfully", data: updatedUser });

  } catch (error) {
    console.error(" Error updating profile:", error);
    res.status(500).json({ success: false, message: "Failed to update profile", error: error.message });
  }
};


export const userDelete = async (req, res) => {
  try {
    const userId = req.params.id;
    const findUserId = await user.findById(userId);

    if (!findUserId) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const allComplaints = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const totalCount = await Complaint.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const complaints = await Complaint.find()
      .populate({ path: "userId", select: "name email mobile dob" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: complaints,
      currentPage: page,
      totalPages,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching complaints:", error.message, error.stack);
    res.status(500).json({ message: "Failed to fetch complaints", error: error.message });
  }
};

export const rejectComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = "Rejected";
    await complaint.save();

    res.status(200).json(complaint);
  } catch (error) {
    console.error("Error rejecting complaint:", error);
    res.status(500).json({ message: "Server error", error });
  }
};





export const allUsers = async (req, res) => {
  try {
    console.log(" Fetching all users..."); 

    const users = await User.find().select("name email mobile address idProof reports");

    console.log("Users fetched successfully:", users.length);
    res.status(200).json(users); 
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const approveComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(complaintId)) {
      return res.status(400).json({ message: "Invalid complaint ID" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status: "Approved" },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (error) {
    console.error("Error approving complaint:", error);
    res.status(500).json({ message: "Error approving complaint", error });
  }
};


export const addFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const newFeedback = new Feedback({ message });
    await newFeedback.save();

    res.status(201).json({ success: true, message: 'Feedback submitted' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getComplaintById = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findById(complaintId)
      .populate({ path: "userId", select: "name email mobile dob" });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (error) {
    console.error("Error fetching complaint by ID:", error);
    res.status(500).json({ message: "Failed to fetch complaint" });
  }
};
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id; 
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting account', error });
  }
};
