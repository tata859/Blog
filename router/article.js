const article=require("../model/article")
const comment=require("../model/comment")
const express=require("express"),
      router=express.Router()
//文章发表
router.post("/",(req,res)=>{
    let {title,tags,content}=req.body;
    //console.log(req.body);
    if(title&&tags.length&&content){
        article.create({
            title,
            //tags:tags.join(","),
            tags,
            content,
            author:req.session.userInfo._id
        })
            .then((data)=>{
                if(data){
                    res.send({
                        code:1,
                        msg:"发表成功"
                    })
                }
                else {
                    res.send({
                        code:0,
                        msg:"服务器异常"
                    })
                }
            })
            .catch(e=>{
                res.send({
                    code:0,
                    msg:"服务器异常"
                })
            })
    }else {
        return res.send({code:0,msg:"信息不完整"})
    }
});
//文章访问路由
router.get("/:_id",(req,res)=>{
    //console.log(req.params);
    let _id=req.params._id
    if(!_id){
        res.redirect("article",{code:0,msg:"没有对应的文章"})
    }
    else {
        article.findById(_id).populate("author")
            .then(data=>{
                if(data){
                    comment.find({article:_id}).populate("author")
                        .then(commentData=>{
                            res.render("article",{code:1,data,commentData})
                        })
                        .catch(e=>{
                            res.render("article",{code:1,data,commentData:[]})
                        })
                }
                else {
                    res.render("article",{code:0,msg:"没有对应的文章"})
                }
            })
            .catch(e=>{
                res.render("article",{code:0,msg:"服务器异常"})
            })
    }
})

module.exports=router;