import express from "express";

// note:
    // "Todo" model: for connecting routes to db and have access to methods like create(), find()
import Todo from "../models/Todo";
const router = express.Router(); // router object will contain methods : get, post etc

// note: 
    // router is just a variable name. important is what is assigned to it: express.Router().

// CREATE (CRUD) ------------------------------
router.post("/", async(req, res)=>{
  try{
      const todo = await Todo.create({title: req.body.title}); // .create() inserts a document into MongoDB and returns a Promise. // // Example: schema has title: String	client sent { "title": "Buy milk" }
      res.status(201).json(todo); // // 201 http status code: created // send it back to the client with res.json(todo).
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
});

// READ ALL (CRUD) ----------------------------------------
// ???????????????????????????? why find() doesnt use the if statement tandard practice: where to implement it whole to do is blank?? ??????
router.get("/", async (req, res) => {
  try {
   const todos = await Todo.find(); // "no filter, return everything."
   res.json(todos); // Express uses 200 OK by default when you call res.json() without setting a status.
  } 
  catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// READ one to do (so by id) (CRUD) ------------------------------------------

    /**  // note:
     *  // "/" (start of path)	Relative to where the router is mounted
     *  // : Tells Express "this segment is a variable, not literal text"
     * // id	The name of the variable. You choose it; it becomes a key on req.params
     * In your app.js or server.js you probably have something like:
        app.use("/api/todos", todoRoutes);
        Express joins the mount path and the route path:
        mount path:   /api/todos
        route path:   /:id
        full pattern: /api/todos/:id
    */
   
router.get("/:id", async(req, res)=>{ // 
    try{
        const todo = await Todo.findById(req.params.id);
            if(!todo){
                return res.status(404).json({message: "To do not found!"})
            }
            res.json(todo);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});


// UPDATE (all fields of an item) — by PUT  (CRUD)  ----------------------------------
router.put("/:id", async(req, res)=>{
    try{
        const todo = await Todo.findByIdAndUpdate( //syntax: Model.findByIdAndUpdate(id, update, options)
        req.params.id,
        {   
            title: req.body.title,
            completed: true
        },
        {
            new: true,
            runValidators: true // options arguement
        }
    );

    if(!todo){
        return res.status(404).json({message: "To do you are trying to update not found!"});
    }
        res.json(todo);
    }

    catch(error){
          res.status(500).json({message: error.message})
    }
})


// UPDATE only selective field of an item - PATCH (CRUD) ----------------------------------------------- 
// ????????????? when to use findOne vs findByID???????
router.patch("/:id/status", async(req, res)=>{
    try{
        const todoUpdatePatch = await Todo.findByIdAndUpdate(
            req.params.id, 
            {
                completed: true
            },
            {   
                new: true,
                runValidators: true
            }
        );

        if(!todoUpdatePatch){
            return res.status(404).json({message: "to do not found"})
        }
        res.json({todoUpdatePatch, message: "to do is completed"})
    }
/// ???????????????????? why only 500 ?
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// DELETE one (CRUD)-----------------------------------
router.delete("/id:", async(req, res)=>{
    try{
        const todoDelete = await Todo.findByIdAndDelete(req.params.id)
        if(!todoDelete){
            return res.status(404).json({message: "To do not found"});
        }
           // res.json(todoDelete); // X X NO bcz the value is deleted
           res.json({message: "To do item deleted successfully!"});
    }

    catch(error){
        res.status(500).json({message: error.message});
    }
})


// DELETE all - deleteMany({}) (CRUD)--------------------------------------
    /** NOTE: 
     * Mongoose/MongoDB interprets that empty object as an empty filter.
     * MongoDB has no condition that a document needs to satisfy.
     * empty filter. An empty MongoDB filter matches every document.
     * todoDeleteAll is a result object. todoDeleteAll.deletedCount === 0
     * deleteMany() is a Mongoose method. result.deletedCount This comes from the result returned by the MongoDB/Mongoose delete operation.
    */
router.delete("/", async(req, res)=>{
    try{
        const todoDeleteAll = await Todo.deleteMany({}); // suggested variable name was "result"
        // console.log(todoDeleteAll);
        
        if(todoDeleteAll.deletedCount === 0){ 
            return res.status(404).json({message: "No todos found"})
        }

        res.json(
            { 
                message: "All todos successfully deleted",
                deletedCount : todoDeleteAll.deletedCount
            });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});