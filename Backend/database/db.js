const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://ankitgupta14998:admin@cluster0.noevujl.mongodb.net/mern2025?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async ()=>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB Successfully");
    } catch (error) {
        console.log("Database Connection Failed",error);
        process.exit(0);
    }
}

module.exports = connectDB;