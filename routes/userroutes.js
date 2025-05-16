import express from 'express';
import { create, views, register, addimage, login, getUserComplaints, resolveComplaint, deleteComplaint, allUsers, allComplaints, addFeedback, myComplaints } from '../controller/complaintcontroller.js';
import { upload } from '../multer.js';
;


const userRouter = express.Router();

userRouter.post('/addimage', upload.single('file'), addimage);

userRouter.get('/views', views);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/allusers',allUsers)
userRouter.get('/allcomplaints',allComplaints)
userRouter.get('/feedback',addFeedback)
userRouter.get('/myComplaints', myComplaints)

export default userRouter;
