const user=require("../model/user")
const crypto=require("crypto")
module.exports=function (req,res) {
    //console.log(req.body);
    //查询信息是否存在
    user.findOne({username:req.body.username})
        .then((data)=>{
            //用户名已存在
            if(data){
                let pwd=crypto.createHash("sha256").update(req.body.password).digest("hex");
                if(pwd===data.password){
                    req.session.userInfo=data;
                    res.send({
                        code:1,
                        msg:"登陆成功"
                    })
                }
                else {
                    res.send({
                        code:0,
                        msg:"密码错误"
                    })
                }
            }
            else {
                res.send({
                    code:0,
                    msg:"用户名不存在"
                })
            }
        })
        .catch((err)=>{
            res.send({
                code:0,
                msg:"服务器异常，请重试"
            })
            throw err;
        })
}