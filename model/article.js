//引入mongoose
const mongoose=require("mongoose")
//引入Schema
const Schema=mongoose.Schema
//创建Schema规则
let articleSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    tags: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required: true
    },
    date:{
        type:Date,default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,ref:"user"
    }
})
module.exports=mongoose.model("article",articleSchema)