const comment=require("../model/comment")
const article=require("../model/article")
const express=require("express"),
    router=express.Router();
router.post("/",(req,res)=>{
    if(!req.session.userInfo){
        return res.send({code:0,msg:"请先登录"})
    }
    let userId=req.session.userInfo._id,
        articleId=req.body.articleId,
        content=req.body.desc;
    if(userId&&articleId&&content){
        //console.log(userId);
        comment.create({
            author:userId,
            article:articleId,
            content
        })
            .then(data=>{
                if(data){
                    res.send({code:1,msg:"评论成功"})
                }
                else {
                    res.send({code:0,msg:"评论失败"})
                }
            })
            .catch(e=>{
                res.send({code:0,msg:"服务器异常，请稍后再试"})
                throw e
            })
    }
    else {
        res.send({
            code:0,msg:"评论内容不能为空"
        })
    }
})
router.post("/delete",(req,res)=>{
    let commentId=req.body.commentId,
        articleId=req.body.articleId,
        userId=req.session.userInfo._id;
    if(commentId&&articleId&&userId){
        comment.findById({_id:commentId})
            .then(data=>{
                if(data){
                    //console.log(data.author);
                    if(data.author==userId){
                        comment.deleteOne({_id:commentId})
                            .then(data=>{
                                if(data){
                                    res.send({code:1,msg:"删除成功"})
                                }else {
                                    res.send({code:0,msg:"删除失败"})
                                }
                            })
                            .catch(e=>{
                                res.send({
                                    code:0,
                                    msg:"服务器异常"
                                })
                                throw e
                            })
                    }
                    else {
                        article.findById({_id:articleId})
                            .then(data=>{
                                if(data.author==userId){
                                    comment.deleteOne({_id:commentId})
                                        .then(data=>{
                                            if(data){
                                                res.send({code:1,msg:"删除成功"})
                                            }else {
                                                res.send({code:0,msg:"删除失败"})
                                            }
                                        })
                                        .catch(e=>{
                                            res.send({
                                                code:0,
                                                msg:"服务器异常"
                                            })
                                            throw e
                                        })
                                }
                                else {
                                    res.send({code:0,msg:"你不是文章作者或评论博主，无法删除"})
                                }
                            })
                            .catch(e=>{
                                res.send({code:0,msg:"服务器异常"})
                            })
                    }
                }
                else {
                    res.send({code:0,msg:"没有此评论"})
                }
            })
            .catch(e=>{
                res.send({code:0,msg:"服务器异常"})
            })
    }
})
module.exports=router;