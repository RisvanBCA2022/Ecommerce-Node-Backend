var express = require('express')
var jwt=require('jsonwebtoken')
var adminroutes=express.Router()
var controller=require('../Controllers/admin')
var tryCatchMiddleware=require('../middleware/tryCatch')
var authentication=require('../middleware/jwtadmin')

adminroutes.post('/admin/login',tryCatchMiddleware(controller.login))
adminroutes.get('/admin/users',authentication,tryCatchMiddleware(controller.showusers))
adminroutes.get('/admin/users/:id',authentication,tryCatchMiddleware(controller.showuserbydid))
adminroutes.get('/admin/products',authentication,tryCatchMiddleware(controller.adminproductshow))
adminroutes.get('/admin/product',authentication,tryCatchMiddleware(controller.showproductbycategory))
adminroutes.get('/admin/products/:id',authentication,tryCatchMiddleware(controller.showproductbyid))
adminroutes.post('/admin/products',authentication,tryCatchMiddleware(controller.createproduct))
adminroutes.put('/admin/products',authentication,tryCatchMiddleware(controller.editproducts))
adminroutes.delete('/admin/products',authentication,tryCatchMiddleware(controller.deleteproduct))
adminroutes.get('/admin/orders',authentication,tryCatchMiddleware(controller.orderdetails))


module.exports=adminroutes