const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const app=express()
const userroutes=require('./Routes/userroutes')
const adminroutes=require('./Routes/adiminroutes')

app.use(bodyparser.json())

mongoose.connect('mongodb://127.0.0.1:27017/items')

app.use('/api',userroutes,adminroutes)

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});