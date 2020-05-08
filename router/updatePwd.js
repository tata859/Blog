const user=require("../model/user")
const crypto=require("crypto")
module.exports=function(req,res){
    console.log(req.body);
    user.findById(req.session.userInfo._id)
        .then((data)=>{
            let oldpwd=crypto.createHash("sha256").update(req.body.oldpassword).digest("hex");
            if(data.password===oldpwd){
                if(req.body.newpassword===req.body.password1){
                    data.password=req.body.newpassword;
                    data.save()
                    res.send({
                        code:1,
                        msg:"修改成功"
                    })
                }
                else {
                    res.send({
                        code:0,
                        msg:"新密码不一致"
                    })
                }
            }
            else {
                res.send({
                    code:0,
                    msg:"原密码不正确"
                })
            }
        })
        .catch((e)=>{
            console.log(e);
            res.send({
                code:0,
                msg:"服务器异常，请稍后再试"
            })
        })
}