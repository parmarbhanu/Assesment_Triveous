const router = require("express").Router();
const Product = require("../Models/ProductModel");
const Cart = require("../Models/CartModel");
const auth=require("../Middleware/Auth");

//Root route
router.get('/:id',  async (req, res) => {
    const userId = req.params.id;
    try {
      let cart = await Cart.findOne({ userId });
      if (cart && cart.products.length > 0) {
        res.send(cart);
      } else {
        res.send(null);
      }
    } catch (error) {
      console.log(err);
      res.status(500).send('Something went wrong');
    }
});

router.post("/addtocart/:id", async (req, res) => {
    const userId = req.params.id;
    const {productId} = req.body;
    const quantity = Number.parseInt(req.body.quantity);
    // console.log("add to cart")
    try {
      let cart = await Cart.findOne({ userId });
      let productDetails = await Product.findOne({ _id: productId });
  
      if (!productDetails) {
        res.status(404).json({
          type: 'Not Found',
          msg: 'Invalid request'
        });
      }
      const price = productDetails.price;
      const name = productDetails.name;
      if (cart) {
        //if cart exist for the user
        let indexFound = cart.products.findIndex(p => p.productId == productId); 
        //check if product exist or not
        if (indexFound !== -1) {
          let productItem = cart.items[indexFound];
          productItem.quantity += quantity;
          cart.items[indexFound] = productItem;
        } else {
          cart.products.push({ productId, name, quantity, price });
        }
  
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //create cart if doesn't exist
        const newCart = await Cart.create({
          userId,
          products: [{ productId, name, quantity, price }],
        
        });
        return res.status(201).send(newCart);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Something went wrong');
    }
  }
);


  router.post('/clearcart', async (req, res) => {
    try {
      // console.log("first")
      const token = req.cookies.token;
      if (!token) return res.json(false);
      var decoded = jwt_decode(token);
      // console.log(decoded.user);
      var userId=decoded.user;
      await Cart.findOneAndDelete({ userId});
      return res.status(201).json("Cart Cleared Succesfully");
    } catch (error) {
      console.log(error);
      res.status(500).send('Something went wrong');
    }
  });


  
module.exports = router;