var express = require('express')
var jwt=require('jsonwebtoken')
var userroutes=express.Router()
var controller=require('../Controllers/user')
var tryCatchMiddleware=require('../middleware/tryCatch')
var authentication=require('../middleware/jwt')

userroutes.post('/users/register',tryCatchMiddleware(controller.register))
userroutes.post('/users/login',tryCatchMiddleware(controller.login ))
userroutes.get('/users/products',authentication,tryCatchMiddleware(controller.products))
userroutes.get('/users/products/:id',authentication,tryCatchMiddleware(controller.productbyid))
userroutes.get('/users/products/category/:categoryname',authentication,tryCatchMiddleware(controller.productbycategory))
userroutes.post('/users/products/:id/cart',authentication,tryCatchMiddleware(controller.cart))
userroutes.get('/users/products/:id/cart',authentication,tryCatchMiddleware(controller.showcart))
userroutes.post('/users/products/:id/wishlists',authentication,tryCatchMiddleware(controller.wishlist))
userroutes.get('/users/products/:id/wishlists',authentication,tryCatchMiddleware(controller.showwishlist))
userroutes.delete('/users/products/:id/wishlists',authentication,tryCatchMiddleware(controller.deletewishlist))
userroutes.post('/payment/:id',authentication,tryCatchMiddleware(controller.payment))
userroutes.get('/users/payment/success',tryCatchMiddleware(controller.success))
userroutes.post('users/payment/cancel',tryCatchMiddleware(controller.cancel))


module.exports=userroutes