
var Userschema=require("../Models/UserSchema")
var Productschema=require('../Models/Productschema')
var jwt=require('jsonwebtoken')
const {authschema}=require('./validation')
const bcrypt=require('bcrypt')


module.exports ={
    register: async (req,res)=>{
        const {error,value} = await authschema.validate(req.body)
        const {username,email,password}=value
        console.log(username);

        if(error){
            res.status(422).json({
                status:"error",
                message:error.details[0].message,
            })
        }else{
        await Userschema.create({
            username:username,
            email:email,
            password:password
        })
        res.status(200).json({
            status:"success",
            message:"successfully register"
        })
    }},
    
    login: async (req,res)=>{
        const {error,value}=await authschema.validate(req.body)
        const {email,password}=value
        if(error){
            res.status(422).json({
                status:"error",
                message:error.details[0].message,
            })
        }else{

        const user=await Userschema.findOne({email:email,password:password})
        console.log(user);
        if(user.length !=0){
            let resp={
                id:user._id,
            }
            let token = jwt.sign(resp,process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({
                status:"success",
                data:user,
                auth:true,
                token:token,
            })
        }
    }},
    products: async (req,res)=>{
     res.json(await Productschema.find())  
    },
    productbyid: async (req,res)=>{
        const product=await Productschema.find({_id:req.params.id})
        res.json(product)
    },
    productbycatego: async (req,res)=>{
        const category = await Productschema.find({category:req.params.categoryname})
        res.json(category)
    },
    cart: async (req,res)=>{
        const productid= await Productschema.find({_id:req.body.id})
        if(productid.length !=0){
            await Userschema.updateOne({_id:req.params.id},{$push:{cart:req.body.id}})
            res.json({
                status:"success"
            })
        }
    },
    showcart: async (req,res)=>{
        const productjk = await Userschema.find({_id:req.params.id}).populate("cart")
        console.log(productjk)
        if(productjk[0].cart.length != 0){
            res.json(productjk[0].cart)
        }
    },
    wishlist: async (req,res)=>{
        const products= await Productschema.find({_id:req.body.id})
        if(products.length !=0){
            await Userschema.updateOne({_id:req.params.id},{$push:{wishlist:req.body.id}})   
            res.json({
                status:"success"
            })   
        }
    },
    showwishlist: async (req,res)=>{
        const wishlistpr=await Userschema.find({_id:req.params.id}).populate("wishlist")
        if(wishlistpr[0].wishlist.length != 0){
            res.json(wishlistpr.wishlist)
        }
    },
    deletewishlist: async (req,res)=>{
        const delte = await Productschema.find({_id:req.body.id})
        if(delte.length != 0){
            await Userschema.updateOne({_id:req.params.id},{$pull:{wishlist:req.body.id}})
            res.json({
                status:"success",
            })
        }else{
            res.json("failure")
        }

    }


}