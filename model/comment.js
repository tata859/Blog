const mongoose=require("mongoose")
const Schema=mongoose.Schema

let commentSchema=new Schema({
    content:{type:String,required:true},
    date:{type: Date,default:Date.now()},
    author:{type:Schema.Types.ObjectId,ref:"user"},
    article:{type:Schema.Types.ObjectId,ref:"article"}
})
module.exports=mongoose.model("comment",commentSchema)