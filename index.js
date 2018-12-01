const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const feedRoutes=require('./routes/feed');
const multer=require('multer');



const app=express();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'image');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

console.log('Running on 8000');
app.use('/image',express.static(path.join(__dirname,'image')));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/feed',feedRoutes);
app.use((error,req,res,next)=>{
    console.log('Error logged');
    const status=error.statuscode || '500';
    res.status(status);
    res.status(status).json({message:error.message});
})


//db configuration
const db=require('./keys/key').mongoURI;
// connect to mongodb
mongoose
.connect(db)
.then(()=>console.log('MongoDb connected'))
.catch(err=>console.log(err));



app.listen(8000);
///27.7.33.169
