const router = require("express").Router();
const Order = require("../Models/OrderModel");
const auth=require("../Middleware/Auth");
const Product = require("../Models/ProductModel");
const Cart = require("../models/cartModel");
const User = require("../Models/UserModel");

//Root route

router.get("/personorder/:id",(req, res) => {
  const userId = req.params.id;
  // console.log("person order",userId);

  try {
      Order.find({userId})
      .then((order) => res.json(order))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;