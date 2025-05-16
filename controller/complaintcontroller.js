
import Complaint from "../Models/Complaint.js";
import user from "../Models/Register.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const create = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    const saved = await complaint.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


import mongoose from 'mongoose';

export const addimage = async (req, res) => {
  try {
    const filePath = req.file?.filename || "";
    const userIdStr = req.body.userId;

    if (!mongoose.Types.ObjectId.isValid(userIdStr)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const userId = new mongoose.Types.ObjectId(userIdStr);

    const newComplaint = new Complaint({
      description: req.body.description,
      complaintType: req.body.complaintType,
      location: req.body.location,
      file: filePath,
      userId: userId,
    });

    const savedComplaint = await newComplaint.save();
    res.json(savedComplaint);
  } catch (e) {
    console.error("Add Complaint Error:", e);
    res.status(500).json({ error: e.message });
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
        const existingmail = await user.findOne({ email: req.body.email });

        if (existingmail) {
            return res.json('mail already exist');

        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword);
        const userData = { ...req.body, password: hashedPassword }

        const newuser = await new user(userData)
        const saveduser = await newuser.save()
        return res.json(saveduser)

    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "error occured during register" })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Received login request with email:", email); 
    try {
        let users = await user.findOne({ email: email });
        if (!users) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, users.password);
        if (isMatch) {
            console.log("Login successful");
            return res.json(users); 
        } else {
            console.log("Invalid password");
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.log("Error during login: ", error);
        return res.status(500).json({ message: "An error occurred during login" });
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

    const complaint = await Complaint.findByIdAndUpdate(complaintId, { status: 'Resolved' }, { new: true });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Complaint resolved successfully', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Error resolving complaint', error });
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
    const { id } = req.params;
    const complaints = await complaint.find({ userId: id });

    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
    const userId = req.params.id;
    const updates = req.body;

    const updatedUser = await user.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
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
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = parseInt(req.query.limit) || 10; // default limit = 10

    const skip = (page - 1) * limit;

    const totalCount = await Complaint.countDocuments(); // Use the correct Mongoose model here
    const totalPages = Math.ceil(totalCount / limit);

    const complaints = await Complaint
      .find()
      .populate("userId", "name email")
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
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
};



export const complaintDetail = async (req, res) => {
  const complaint = await complaintModel.findById(req.params.id).populate('userId');
  res.json({ data: complaint });
}
export const approveComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await complaintModel.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Update the status to 'approved'
    complaint.status = "approved";
    await complaint.save();

    res.status(200).json({ message: "Complaint approved", data: complaint });
  } catch (error) {
    console.error("Error approving complaint:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const rejectComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await complaintModel.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Update the status to 'rejected'
    complaint.status = "rejected";
    await complaint.save();

    res.status(200).json({ message: "Complaint rejected", data: complaint });
  } catch (error) {
    console.error("Error rejecting complaint:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const allUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json({data: users});
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
}

export const addFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({ message: 'Feedback is required' });
    }

    const newFeedback = new Feedback({ feedback });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback added successfully', data: newFeedback });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
