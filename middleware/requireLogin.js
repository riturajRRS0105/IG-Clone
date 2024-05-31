const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const {JWT_SECRET}=require('../keys')
const User=require('../models/user')

module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    // console.log("hello",authorization)
    if(!authorization)
    return res.status(401).json({error:"Login to continue"})
    else{
        const token=authorization.split(" ")[1]
        jwt.verify(token,JWT_SECRET,(err,data)=>{
            if(err)
            return res.status(401).json({error:"Invalid token"})
            else{
                const {_id}=data
                User.findById(_id)
                    .then(userData=>{
                        req.user=userData
                        next()  
                    })
                    .catch(err=>console.log(err))
            }
        })
    }
}