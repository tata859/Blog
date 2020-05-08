const article=require("../model/article")

module.exports=(req,res)=>{
    //console.log(req.body)
    let _id=req.session.userInfo._id;
    let keyword=req.body.keyword;
    let conditions={};
    let i="i";
    let reg=new RegExp(keyword,i)
    if(keyword){
        conditions={
            author:_id,
            $or:[
                {title:reg},
                {tags:reg},
                //{content:reg}
            ]
        }
    }else {
        conditions={author:_id}
    }
    article.find(
        conditions
        )
        .then((data)=>{
            //console.log(data);
            if(data.length){
               res.send({
                   code:1,
                    data
               })
            }else {
                res.send({
                    code:0,
                    msg:"你查询的信息不存在"
                })
            }
        })
        .catch(e=>{
            res.send({
                code:0,
                msg:"服务器异常，请稍后再试"
            })
        })
}