const Productschema = require("../Models/Productschema");
const Userschema = require("../Models/UserSchema");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    //TODO: Implement Bcrypt
    // const {error, value}=
    const admin = { email: "admin", password: "admin" };
    const { email, password } = req.body;
    if (admin.email == email && admin.password == password) {
      let resp = {
        id: admin.username,
      };
      let jwt_token = jwt.sign(resp, "thisisadmin");
      res.status(200).json({
        status: "success",
        message: "Successfully logged In",
        data: { jwt_token },
      });
    } else {
      res.json("error");
    }
  },
  showusers: async (req, res) => {
    //TODO: Implement tryCatch
    const user = await Userschema.find();
    if (user.length != 0) {
      res.status(200).json(await Userschema.find());
    } else {
      res.json("Can't show the user");
    }
  },
  showuserbydid: async (req, res) => {
    const users = await Userschema.find({ _id: req.params.id });
    if (users.length != 0) {
      res.status(200).json({
        status: "success",
        message: "successfully fetched user data",
        data: users,
      });
    } else {
      res.json("User not found in this id");
    }
  },
  adminproductshow: async (req, res) => {
    const adminproduct = await Productschema.find();
    if (adminproduct.length != 0) {
      res.status(200).json({
        status: "success",
        message: "successfully fetched products detail",
        data: adminproduct,
      });
    } else {
      res.json("Error");
    }
  },
  showproductbycategory: async (req, res) => {
    const products = await Productschema.find({
      category: req.params.categoryname,
    });
    if (products.length != 1) {
      res.status(200).json({
        status: "success",
        message: "Successfully fetched products details",
        data: products,
      });
    } else {
      res.json("error");
    }
  },
  showproductbyid: async (req, res) => {
    const products = await Productschema.find({ _id: req.params.id });
    if (products.length != 0) {
      res.status(200).json({
        status: "success",
        message: "successfully fetched product details",
        data: products,
      });
    } else {
      res.json("NO product with this id");
    }
  },
  createproduct: async (req, res) => {
    const { title, description, price, image, category } = req.body;
    if (req.body.length != 0) {
      await Productschema.create({
        title: title,
        description: description,
        price: price,
        image: image,
        category: category,
      });
      res.status(200).json({
        status: "success",
        message: "Successfully created a product",
      });
    } else {
      res.json({
        status: "failure",
      });
    }
  },
  editproducts: async (req, res) => {
    const { id, title, description, price, image, category } = req.body;
    if (req.body.length != 0) {
      await Productschema.findByIdAndUpdate(id, {
        $set: {
          title: title,
          description: description,
          price: price,
          image: image,
          category: category,
        },
      });
      res.status(200).json({
        status: "success",
        message: "Successfully created a product",
      });
    } else {
      res.json({
        status: "failure",
      });
    }
  },// TODO: Implement joi validation

  deleteproduct: async (req, res) => {
    const deleteproductid = await Productschema.find({ _id: req.body.id });
    if (deleteproductid.length != 0) {
      await Productschema.deleteOne({ _id: deleteproductid });
      res.json({
        status: "success",
        message: "Successfully deleted a product",
      });
    }
  },
};
