const express= require('express')
const app=express()

require('./models/connect')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

const PORT=3000
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))