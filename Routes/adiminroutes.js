var express = require('express')
var jwt=require('jsonwebtoken')
var adminroutes=express.Router()
var controller=require('../Controllers/admin')

adminroutes.post('/admin/login',controller.login)
adminroutes.get('/admin/users',controller.showusers)
adminroutes.get('/admin/users/:id',controller.showuserbydid)
adminroutes.get('/admin/products',controller.adminproductshow)
adminroutes.get('/admin/products/category/:categoryname',controller.showproductbycategory)
adminroutes.get('/admin/products/:id',controller.showproductbyid)
adminroutes.post('/admin/products',controller.createproduct)
adminroutes.put('/admin/products',controller.editproducts)
adminroutes.delete('/admin/products',controller.deleteproduct)


module.exports=adminroutes