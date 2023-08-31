
var Userschema=require("../Models/UserSchema")
var Productschema=require('../Models/Productschema')
var jwt=require('jsonwebtoken')
const {authschema}=require('./validation')
const bcrypt=require('bcrypt')
let temp

module.exports ={
    register: async (req,res)=>{
        const {error,value} = await authschema.validate(req.body)
        const {username,email,password}=value

        if(error){
            res.status(422).json({
                status:"error",
                message:error.details[0].message,
            })
        }else{
            const finduser = await Userschema.find({username:username})

            if(finduser.length>0){
                return res.status(401).json({status:false,message:'Already registered'})
            }
            else{
                bcrypt.hash(password,10,async function(err,hash){
                    await Userschema.create({
                        username:username,
                        email:email,
                        password:hash
                    })
                }) //hashed the password from user and stored the hashed password in database
       
        res.status(200).json({
            status:"success",
            message:"successfully register"
        })
    }}},
    
    login: async (req,res)=>{
        const {error,value}=await authschema.validate(req.body)
        const {email,password}=value
        if(error){
            res.status(422).json({
                status:"error",
                message:error.details[0].message,
            })
        }else{

        const user=await Userschema.findOne({email:email})
        if(!user){
            return res.status(401).json({
                auth:false,
                message:"invalid username or password"
            })
        }
        else{
            // let Password =await bcrypt.hash(password,10) //hashed the password from in login page
            // console.log(Password)
            // console.log(user.password);
            const dec= await bcrypt.compare(password,user.password)
            console.log(dec);
                if(!dec){
                    res.json({
                        status:"failure",
                        message:"password or username is wrong",

                    })
                }else{
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
    
            }
           
        }
    },
    products: async (req,res)=>{
     res.json(await Productschema.find())  
    },
    productbyid: async (req,res)=>{
        const product=await Productschema.find({_id:req.params.id})
        res.json(product)
    },
    productbycategory: async (req,res)=>{
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
            res.json(wishlistpr[0].wishlist)
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
    },
    payment: async (req,res)=>{
        const stripe = require("stripe")(process.env.STIPE_KEY)
        const user = await Userschema.find({_id:req.params.id}).populate("cart");
        const cartitem = user[0].cart.map((item)=>{
            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.title,
                        description:item.description,
                    },
                    unit_amount:Math.round(item.price*100),
                },
                quantity:1
            }
        })
        if(cartitem!=0){
            const session = await stripe.checkout.sessions.create({
                line_items:cartitem,
                mode:'payment',
                success_url:'http://127.0.0.1:3000/api/users/payment/success',
                cancel_url:'http://127.0.0.1:3000/api/users/payment/cancel'
            })
            temp={
                cartitem:user[0].cart,
                id:req.params.id,
                paymentid:session.id,
                amount:session.amount_total/100
            }
            res.send({url:session.url});
        }else{
            res.send("NO item in cart")
        }

    },
    success: async(req,res)=>{
        const user = await Userschema.find({_id:temp.id})
        console.log(user);
        if(user.length!=0){
            await Userschema.updateOne({_id:temp.id},{$push:{orders:{product:temp.caritem,date:new Date(),orderid:Math.random(),paymentid:temp.paymentid,totalamount:temp.amount}}})
            await Userschema.updateOne({_id:temp.id},{cart:[]})
        }
        res.status(200).json({
            status:"success",
            message:"succeccfully added in order",
        })
    },
    cancel: async (req,res)=>{
        res.json("cancel payment")
    }
}