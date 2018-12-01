

const {validationResult}=require('express-validator/check');
const Post=require('../models/post');
exports.getPosts=(req,res,next)=>{
    console.log("happening");
    console.log("req",req);
    console.log("res",res);
    Post.find()
    .then(posts=>{
        res.status(200).json({
            message:"All posts",
            posts:posts
        })
    })
    .catch(err=>{
        if(!err.statuscode){
            err.statuscode=500;
        }
        next(err);// to reach the next error handling middleware
    })
}

exports.createPost=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error =new Error('Validation failed as entered data is incorrect');
        error.statuscode=422;
        throw error;

    }
    if(!req.file){
        const error =new Error('No file');
        error.statuscode=422;
        throw error;
    }
    const imageUrl=req.file.path;

    const title=req.body.title;
    const content=req.body.content;
    const creator=req.body.creator;
    const post =new Post({
        title:title,
        content:content,
        iamgeUrl:imageUrl,
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
exports.getPost=(req,res,next)=>{
    const postId=req.paarms.postId;
    Post.findById(postId).
    then((post)=>
       {
           if(!post){
               const error= new Error('Could not find a post');
               error.statuscode(404);
               throw error;
           }

           res.status(200).json({message:'Post fetched',post:post});
       }).catch(err=>{
        if(!err.statuscode){
            err.statuscode=500;
        }
        next(err);// to reach the next error handling middleware
    })
}
exports.deletePost=(req,res,next)=>{
     const postId = req.params.postId;
     Post.findById(postId).then(
         post=>{
             if (!post) {
               const error = new Error('Could not find post.');
               error.statusCode = 404;
               throw error;
             }
             return Post.findByIdAndRemove(postId);
             clearImage(post.url);

         }).
           then(result=>{
               console.log('Successfully deleted');
               res.status(200).json({message:'Deleted post'});
           }).catch(err=>{
         if(!err.statuscode){
             err.statuscode=500;
         }
         next(err);// to reach the next error handling middleware
     })

}
exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  console.log('title',title);
  console.log('content',content);
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      console.log('new post',post);
      return post.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Post updated!', post: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
