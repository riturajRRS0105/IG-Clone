const mongoose=require('mongoose')
const {MONGO_URI}=require('../keys')

//Database connection
// require('./models/connect')

mongoose.connect(MONGO_URI,(err,res)=>{
    if(err)
    console.log(err)
    else
    console.log("Database connected")
})