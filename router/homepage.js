const user=require("../model/user")
module.exports=function (req,res) {
    let data={};
   // console.log(req.session.userInfo.username);
   // console.log(req.body);
    if(req.session.userInfo){
        data=user.findById(req.session.userInfo._id).then((data)=>{
            res.render("homepage",data)
        })
            .catch(()=>{

            })
    }else {
        res.render("homepage",{_id:null})
    }
    /*user.findOne({username:req.session.userInfo.username})
        .then((data)=>{
            console.log(data);
        })*/

}