import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
       
        const uniqueSuffix = Date.now();
       
        cb(null, uniqueSuffix + file.originalname); 
    }
});

const fileFilter = (req, file, cb) => {
   
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true); 
    } else {
        cb(new Error('Only image or video files are allowed'), false); 
    }
};


export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
