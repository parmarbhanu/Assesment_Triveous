const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
app.use(express.json());
app.use(cookieParser());
// const auth=require("./Middleware/authMiddleware")
app.use(cors({
  origin: [
    "http://localhost:5000",
     "http://localhost:3000",
  ],
  credentials: true,
})
);
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MDB_CONNECT) 
.then(()=>{console.log('Mongodb connected')})
.catch((err)=>{console.log("Error in connection",err)});




app.use("/auth", require("./Router/UserRouter"));
app.use("/product", require("./Router/ProductRouter"));
// app.use("/order", require("./Router/OrderRouter"));
app.use("/cart", require("./Router/CartRouter"));




const path=require("path");
app.use(express.static('Client/build'));
 app.get('*', (req, res) => {
    res.sendFile(path.resolve('Client','build','index.html'));
});