var express = require('express')
var jwt=require('jsonwebtoken')
var userroutes=express.Router()
var controller=require('../Controllers/user')


userroutes.post('/users/register',controller.register)
userroutes.post('/users/login',controller.login )
userroutes.get('/users/products',controller.products)
userroutes.get('/users/products/:id',controller.productbyid)
userroutes.get('/users/products/category/:categoryname',controller.productbycatego)
userroutes.post('/users/products/:id/cart',controller.cart)
userroutes.get('/users/products/:id/cart',controller.showcart)
userroutes.post('/users/products/:id/wishlists',controller.wishlist)
userroutes.get('/users/products/:id/wishlists',controller.showwishlist)
userroutes.delete('/users/products/:id/wishlists',controller.deletewishlist)


module.exports=userroutes