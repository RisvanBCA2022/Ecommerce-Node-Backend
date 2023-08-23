const mongoose=require('mongoose')

const Userschema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    cart:[{type: mongoose.Schema.Types.ObjectId,ref:'products'}],
    wishlist:[{type: mongoose.Schema.Types.ObjectId,ref:'products'}],
    orders:[]
})

module.exports = mongoose.model('Ecommercestore',Userschema)