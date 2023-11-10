const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const app=express()
const userroutes=require('./Routes/userroutes')
const adminroutes=require('./Routes/adiminroutes')
// const bcrypt=require('bcrypt')
require('dotenv').config()

app.use(bodyparser.json())

mongoose.connect(process.env.MONGOURL)

app.use('/api',userroutes,adminroutes)

app.listen(8000, () => {
    console.log('App listening on port 3000!');
});