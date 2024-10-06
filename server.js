import express from  "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import Razorpay from "razorpay"



// app config
const app =express()
const port = 4000;


//middleware
app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true })); // for parsing URL-encoded data
app.use(bodyParser.urlencoded({ extended: false })); // for parsing URL-encoded data

// app.use(bodyParser.json())
app.use(cors());

//db connection
connectDB()

// api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.post('/order', async (req, res) => {
    // initializing razorpay
    const razorpay = new Razorpay({
        key_id: "rzp_test_nVAGLWdI0YbQyg",
        key_secret: "Flp8KiwEgi8nfjL4d3Pe4WDA",
    });
    
    
    
    // setting up options for razorpay order.
    const options = {
        amount: req.body.amount,
        currency:"INR",
        receipt: "any unique id for every order",
        payment_capture: 1
    };
    try {
        const response = await razorpay.orders.create(options)        
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {      
       res.status(400).send('Not able to create order. Please try again!');
    }
});



app.get("/",function(req,res){
    res.send("working");
})

app.listen(port,function(){
    console.log(`server running ${port} `);
    
});

