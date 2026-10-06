import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js"; // imported "router" and custom named as "todoRoutes"
const app = express();
// note: In ES modules, imports are hoisted: they are all resolved and executed before the rest of the file.
    // note: const PORT = 5000; for initial test run
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
app.use("/api/todos", todoRoutes); // syntax: app.use([path,] callback [, callback...]) // todos= plural REST convention // "/api/todos" = this route is for data, not for a web page.
connectDB();

app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`);
});