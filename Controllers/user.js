
var Userschema=require("../Models/UserSchema")
var Productschema=require('../Models/Productschema')
var jwt=require('jsonwebtoken')

module.exports ={
    register: async (req,res)=>{
        const {username,email,password}= await req.body
        await Userschema.create({
            username:username,
            email:email,
            password:password
        })
        res.status(200).json({
            status:"success",
            message:"successfully register"
        })
    },
    login: async (req,res)=>{
        const {email,password}=req.body
        const user=await Userschema.find({email:email,password:password})
        if(user.length !=0){
            let resp={
                id:user[0].id,
            }
            let token = jwt.sign(resp,"hidden")
            res.status(200).json({
                status:"success",
                data:user,
                auth:true,
                token:token
            })
        }
    },
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