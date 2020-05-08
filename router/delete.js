const article=require("../model/article")

module.exports=(req,res)=>{
    let _id=req.body._id;
    //console.log(_id);
    if(!_id){
        return res.send({code:0,msg:"信息出错"});
    }
    article.deleteOne({_id})
        .then(data=>{
            res.send({
                code:1,
                msg:"删除成功"
            })
        })
        .catch(e=>{
            res.send({
                code:0,
                msg:"服务器异常"
            })
        })
}