import mongoose from "mongoose";

/** Note:
 * Schema is a class, and new creates an instance (an object) from it.
 * Todo is not an object, it's another class
    mongoose.model() is a factory function. It takes your schema object and returns a new class.
 * The real objects are the documents
 * 
 */
const toDoSchema = new mongoose.Schema(
    // object wrapper
    {
        // nested objects(definition objects)
        title:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 100,
        },

        completed: {
            type: Boolean,
            default: false
        },

         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
    },

    },

    // optional arguement
    {
        timestamps: true
    }
)


const Todo = mongoose.model("Todo", toDoSchema);
export default Todo;
