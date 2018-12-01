const express=require('express');
const feedController=require('../controllers/feed');
const {body}=require('express-validator/check');

const router=express.Router();
//Get request
router.get('/get',feedController.getPosts);
//Post request
router.post('/post',
[
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5})
]
,feedController.createPost);
router.get('/post/:postId',feedController.getPost);
router.put('/post/:postId',feedController.updatePost);
router.delete('/post/:postId',feedController.deletePost);
module.exports=router;
