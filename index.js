const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const feedRoutes=require('./routes/feed');



const app=express();
console.log('Running on 8000');
app.use('/images',express.static(path.join(__dirname,'image')));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/feed',feedRoutes);
app.use((error,req,res,next)=>{
    console.log('Error logged');
    const status=error.statuscode || 500;
    res.status(statuscode);
    res.status(status).json({message:message});
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
