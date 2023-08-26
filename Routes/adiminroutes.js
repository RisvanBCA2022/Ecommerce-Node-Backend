var express = require('express')
var jwt=require('jsonwebtoken')
var adminroutes=express.Router()
var controller=require('../Controllers/admin')
var tryCathMiddleware=require('../middleware/tryCatch')
var authentication=require('../middleware/jwtadmin')

adminroutes.post('/admin/login',tryCathMiddleware(controller.login))
adminroutes.get('/admin/users',authentication,tryCathMiddleware(controller.showusers))
adminroutes.get('/admin/users/:id',authentication,tryCathMiddleware(controller.showuserbydid))
adminroutes.get('/admin/products',authentication,tryCathMiddleware(controller.adminproductshow))
adminroutes.get('/admin/products/category/:categoryname',authentication,tryCathMiddleware(controller.showproductbycategory))
adminroutes.get('/admin/products/:id',authentication,tryCathMiddleware(controller.showproductbyid))
adminroutes.post('/admin/products',authentication,tryCathMiddleware(controller.createproduct))
adminroutes.put('/admin/products',authentication,tryCathMiddleware(controller.editproducts))
adminroutes.delete('/admin/products',authentication,tryCathMiddleware(controller.deleteproduct))


module.exports=adminroutes