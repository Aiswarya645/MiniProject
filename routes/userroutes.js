import express from 'express';
import { create, views, register, addimage, login, getUserComplaints, resolveComplaint, deleteComplaint, allUsers, allComplaints, addFeedback, myComplaints, updateProfile, rejectComplaint, approveComplaint, getComplaintById, getAllFeedback, deleteUserAccount } from '../controller/complaintcontroller.js';
import { upload } from '../multer.js';
import { verifytoken } from '../middleware/auth.js'; // adjust path if needed



const userRouter = express.Router();

userRouter.post('/addimage', upload.single('file'), addimage);
userRouter.get('/create', create);
userRouter.get('/views', views);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/allusers',allUsers)
userRouter.put('/updateprofile',updateProfile)
userRouter.get('/allcomplaints/',allComplaints)
userRouter.post('/feedback',addFeedback)
userRouter.get('/myComplaints/:userId', myComplaints)

userRouter.get('/getfeedback',getAllFeedback)
userRouter.delete('/delete', verifytoken, deleteUserAccount);



userRouter.get('/complaint/:complaintId',getComplaintById);
userRouter.put('/approve/:complaintId', approveComplaint);
userRouter.put('/reject/:complaintId', rejectComplaint);
userRouter.put('/resolve/:complaintId', resolveComplaint);



export default userRouter;
