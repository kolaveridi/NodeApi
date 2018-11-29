const express=require('express');
const feedController=require('../controllers/feed');


const router=express.Router();
//Get request
router.get('/get',feedController.getPosts);
//Post request
router.post('/post',feedController.createPost);

module.exports=router;