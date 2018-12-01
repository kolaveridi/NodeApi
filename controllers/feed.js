

const {validationResult}=require('express-validator/check');
const Post=require('../models/post');
exports.getPosts=(req,res,next)=>{
    console.log("happening");
    console.log("req",req);
    console.log("res",res);
    res.status(200).json({
        posts:[
            {
                _id:'123',
                title:"Title1",
                content:"This is content",
                imageUrl:'image/satyajeetsnap-min.jpg',
                creator:{
                    name:"Satya"
                },
                createdAt:new Date()
            }

        ]
    });
}
exports.createPost=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error =new Error('Validation failed as entered data is incorrect');
        error.statuscode=422;
        throw error;

    }
    const title=req.body.title;
    const content=req.body.content;
    const creator=req.body.creator;
    const post =new Post({
        title:title,
        content:content,
        iamgeUrl:'/iamges/satyajeetsnap-min.jpg',
        creator:{name:creator},
    });
    post.save()
    .then((result)=>{
        console.log("result",result);
        res.status(201).json({
            message: "Post created Successfully",
        });
    }).catch(err=>{
        if(!err.statuscode){
            err.statuscode=500;
        }
        next(err);// to reach the next error handling middleware
       }
    );

    console.log("title",title);
    console.log("content",content);
    console.log("Post request");
}
