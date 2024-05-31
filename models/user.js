const mongoose=require('mongoose')
const {ObjectID}=mongoose.Schema.Types

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        isUnique:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://images.unsplash.com/photo-1495001258031-d1b407bc1776?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
    },
    followers:[{
        type:ObjectID,
        ref:'User'
    }]
})

const User=mongoose.model('User',userSchema)
module.exports=User
