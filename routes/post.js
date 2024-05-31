const express=require('express')
const requireLogin = require('../middleware/requireLogin')
const router=express.Router()

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic}=req.body
    if(!title || !body || !pic)
    return res.status(422).json({error:"Please fill all fields"})

    console.log(req.user)
})



module.exports=router