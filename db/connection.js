const mongoose = require("mongoose")
const {userSchema}=require("./user")
const {blogSchema}=require("./blog.js")
const uri = process.env.URI

const connectToDatabase = async ()=>{
    try{
        await mongoose.connect(uri)
        console.log("Connected to database!")
    }
    catch(e){
        console.log(e)
    }
}

const User= mongoose.model('User',userSchema)
const Blog=mongoose.model('Blog',blogSchema)


module.exports={connectToDatabase, User, Blog}