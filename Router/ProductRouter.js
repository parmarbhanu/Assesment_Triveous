const router = require("express").Router();
const Product = require("../Models/ProductModel");
const Auth=require("../Middleware/Auth");

//Root route to show all products
router.get("/",(req, res) => {
    try {
        Product.find()
        .then((product) => res.json(product))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      res.json(false);
    }
});


//route to display a particular product by id
router.route("/:id").get((req, res) => {
    Product.findById(req.params.id)
        .then((product) => res.json(product))
        .catch((err) => res.status(400).json("Error: " + err));
});
 


module.exports = router;