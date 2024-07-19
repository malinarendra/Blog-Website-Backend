const Schema= require("mongoose").Schema

const userObject={
    id:{type:String,required:true},
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
    imagePublicId:{type:String,required:true},
    dateJoined:{type:Date,required:true},
    lastUpdated: {type:Date,required:false}
}

const userSchema = new Schema(userObject)

module.exports={userSchema}