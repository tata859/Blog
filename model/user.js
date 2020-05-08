//引入Schema
const mongoose=require("mongoose")
    ,Schema=mongoose.Schema
    //引入加密包
    ,crypto=require("crypto");
//创建Schema规则
let userSchema=new Schema({
    username:{
        type:String
        ,required:true
        ,macth:[/^[\\da-zA-Z\u4e00-\u9fa5]{2,12}$/]
    },
    password:{
        type:String
        ,required:true
        ,macth:[/^[\da-zA-Z\[!@#$%^&*()]{6,12}$/]
    }
    ,userInfo:{
        sex:{type:String,enum:["男","女"]}
        ,age:{type:String,min:0,}
        ,tel:{type:String,macth:/^1[3456789]\d{9}$/}
        ,email:{type:String,macth:/^[\da-z]+@[\da-z]+(\.[a-z]+)+$/i}
        ,status:{type:String,default:"这个人很懒，什么都没写......"}
    }
})
//利用中间件加密
userSchema.pre("save",function (next) {
    //用hash加密方式
    let newpwd=crypto.createHash("sha256").update(this.password).digest("hex");
    this.password=newpwd;
    next()
})

module.exports=mongoose.model("user",userSchema);