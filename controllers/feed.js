exports.getPosts=(req,res,next)=>{
    console.log("happening");
    console.log("req",req);
    console.log("res",res);
    res.status(200).json({
        name:'Satyajeet',
        age:'20'
    });
}
exports.createPost=(req,res,next)=>{
    const title=req.body.title;
    const content=req.body.content;
    console.log("title",title);
    console.log("content",content);
    console.log("Post request");
    res.status(201).json({
       message: "Post created Successfully",
        data:{title:title,content:content}
    });
}