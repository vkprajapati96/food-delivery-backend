import mongoose from "mongoose";

export const connectDB =async ()=>{
    await mongoose.connect("mongodb+srv://vishal:vis123@cluster0.qmeto.mongodb.net/food-del").then(()=>console.log("DB connected")
    );
}



