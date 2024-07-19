const Schema = require("mongoose").Schema

const blogObject = {
    id:{type:String,required:true},
    userId:{type:String,required:true},
    blogImageUrl:{type:String,required:true},
    imagePublicId:{type:String,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true},
    tag:{type:String,required:true},
    dateCreated:{type:Date,required:true},
    lastEditDate:{type:Date,required:false},
    status:{type:String,required:true},
    fname: {type:String, required:true},
    lname: {type:String, required:true}
}

const blogSchema = new Schema(blogObject)

module.exports={blogSchema}