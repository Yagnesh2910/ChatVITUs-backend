const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

const dbConnect = async() => {
    try{
        await mongoose.connect("mongodb+srv://yagneshsanku25:Bankai%40369@cluster0.1y6logt.mongodb.net/ChatVITUs");
        console.log("Db Connected");
    }catch(error){
        console.log("Error in connection");
        console.log(error);
    }
};

app.use(express.json());
app.use(cors({
    
}));
app.get("/", (req,res) => {
    res.send("Hlo World");
});

app.use("/users", userRoutes);
app.use("/chats", chatRoutes);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    dbConnect();
    console.log("On", port);
})