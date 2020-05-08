const user=require("../model/user")
module.exports=function (req,res) {
    let data = {};
    let _id=req.session.userInfo._id;
    let postData = req.body;
    for (let [key,value] of Object.entries(postData)) {
        if(value){
            data["userInfo." + key] = value;
        }
    }
    //console.log(req.session.userInfo._id);
    // console.log(req.session.userInfo.username);
    // console.log(req.body);
    user.updateOne(
        {username:req.session.userInfo.username},
         {$set: data},
        //{runValidators: true}
    )
        .then(() => {
            res.send({
                code: 1,
                msg: "更新成功"
            })
        })
        .catch((e) => {
            console.log(e);
            res.send({
                code: 0,
                msg: "服务器异常，请稍后再试"
            })
        })
}