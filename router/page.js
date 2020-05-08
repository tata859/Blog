const user=require("../model/user")
module.exports=function (req,res) {
    let data={};
    if(req.session.userInfo){
        date= req.session.userInfo;
        data={
            _id:date.id,
            username:date.username,
            url:"/homepage",
            loout:"退出登录"
        }
    }else {
        data= {
            _id: null
            ,url:"logon"
            , username: "请登录"
            ,loout:null
        }
    }
    res.render("page",data)
}