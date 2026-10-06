import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
const app = express();

// const PORT = 5000; for initial test run
const PORT = process.env.PORT || 5000; 

    /** Note
     * JSON middleware: parse incoming JSON request bodies
     * app.use(): generally used to register middleware.
     * express.json() : Built-in middleware
    */
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Todo API is running");
});

// ????????????????? why not before app.get ????????????????
connectDB();

app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`);
});