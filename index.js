const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const app=express()
const userroutes=require('./Routes/userroutes')
const adminroutes=require('./Routes/adiminroutes')
// const bcrypt=require('bcrypt')
require('dotenv').config()

app.use(bodyparser.json())

mongoose.connect('mongodb+srv://mohammedrisvan16:justdo1t@cluster0.vr7cd4x.mongodb.net/?retryWrites=true&w=majority')

app.use('/api',userroutes,adminroutes)

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});