const joi=require('joi')

const authschema = joi.object({
    username:joi.string(),
    email:joi.string().email().lowercase().required(),
    password:joi.string().required()
})

const auth_productschema=joi.object({
    id:joi.string(),
    title:joi.string(),
    description:joi.string(),
    price:joi.number(),
    image:joi.string(),
    category:joi.string(),
})
module.exports={authschema,auth_productschema}