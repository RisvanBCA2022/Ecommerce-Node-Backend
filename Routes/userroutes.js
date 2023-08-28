var express = require('express')
var jwt=require('jsonwebtoken')
var userroutes=express.Router()
var controller=require('../Controllers/user')
var tryCathMiddleware=require('../middleware/tryCatch')
var authentication=require('../middleware/jwt')

userroutes.post('/users/register',tryCathMiddleware(controller.register))
userroutes.post('/users/login',tryCathMiddleware(controller.login ))
userroutes.get('/users/products',authentication,tryCathMiddleware(controller.products))
userroutes.get('/users/products/:id',authentication,tryCathMiddleware(controller.productbyid))
userroutes.get('/users/products/category/:categoryname',authentication,tryCathMiddleware(controller.productbycatego))
userroutes.post('/users/products/:id/cart',authentication,tryCathMiddleware(controller.cart))
userroutes.get('/users/products/:id/cart',authentication,tryCathMiddleware(controller.showcart))
userroutes.post('/users/products/:id/wishlists',authentication,tryCathMiddleware(controller.wishlist))
userroutes.get('/users/products/:id/wishlists',authentication,tryCathMiddleware(controller.showwishlist))
userroutes.delete('/users/products/:id/wishlists',authentication,tryCathMiddleware(controller.deletewishlist))
userroutes.post('/payment/:id',authentication,tryCathMiddleware(controller.payment))
userroutes.get('/users/payment/success',tryCathMiddleware(controller.success))
userroutes.post('users/payment/cancel',tryCathMiddleware(controller.cancel))


module.exports=userroutes