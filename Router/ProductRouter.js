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
 

// /Route to add a new post
router.route("/addproduct").post((req, res) => {
    //Retrieve data for post
    const { name,  description, price,  category, quantity,unit} = req.body;
    //Create a new Post and save it to DB
    // console.log(req.body);
    const newProduct = new Product({
      
        name,
        description,
        price,
        category,
        quantity,
        unit
        });
    // Save the new post
    newProduct
        .save()
        .then(() => res.json("Product Added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;