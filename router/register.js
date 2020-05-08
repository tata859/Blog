const user=require("../model/user")
module.exports=function (req,res) {
    //console.log(req.body);
    user.findOne({username:req.body.username})
        .then((data)=>{
            //用户名已存在
            if(data){
               res.send({
                   code:1,
                   msg:"用户名已存在"
               })

            }
            else {
                if(req.body.password!==req.body.password1){
                    res.send({
                        code:0,
                        msg:"两次密码不一致"
                    })
                }
                else{
                    let date={
                        username:req.body.username,
                        password:req.body.password,
                        userInfo:{
                            tel:req.body.tel
                        }
                    }
                    user.create(date)
                        .then(()=>{
                            //req.session.userInfo=datal
                            /*user.update(
                                {username:req.body.username},
                                {
                                    $set:{
                                        "userInfo.tel":req.body.tel
                                    }
                                }
                            )
                                .then(()=>{})
                                .catch((e)=>{
                                    console.log(e);
                                })*/
                            res.send({
                                code:1,
                                msg:"注册成功"
                            })
                        })
                        .catch(()=>{
                            res.send({
                                code:0,
                                msg:"服务器异常，请稍后再试"
                            })
                        })
                }
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