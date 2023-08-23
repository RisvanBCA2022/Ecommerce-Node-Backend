const mongoose=require('mongoose')

const Productschema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    image:String,
    category:String
})

module.exports=mongoose.model('products',Productschema)