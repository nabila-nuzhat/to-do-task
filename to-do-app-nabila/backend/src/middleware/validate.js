/**
 * The inner function can still use schema after validate has finished running. This is a closure:
     a function that keeps access to variables from the scope where it was created.
 * Returned function:	Middleware function	(req, res, next) => void
 * 
 */


/**
 * creating a function that receives another value.
a function receiving another function/value as an argument.
That value will be a Zod schema.
 const validate = (schema) => {
 For example:
validate(registerSchema)
 * 
 * const result = schema.safeParse(req.body);
    user sends: req.body
    Zod checks it against: eg. registerSchema
    safeParse() returns a result object instead of immediately throwing an exception. Zod's docs show the result pattern as:
const result = schema.safeParse(data);
safeParse(): A method, inherited by every schema object
    safeParse(data) runs the schema's rules against the data and returns a result object. It never throws for bad data.
data: The argument: any value (usually req.body), type unknown..................more in Claude Zod auth schema basics
    if (!result.success) {
    // result.error
    } else {
    // result.data
    }
 * result.error.issues
If validation fails: it contains information about the validation errors.
 * Why replace req.body? Because Zod may have transformed the data.

 * next();
Validation succeeded. Continue to the next middleware/controller.
 */
const validate = (schema) =>{
    return (req, res, next) =>{
        const result = schema.safeParse(req.body);
        if(!result.success){
            res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues,
            });
        }
        req.body = result.data; // Why replace req.body : Because Zod may have transformed the data to lowercase, trimmed. So now the controller receives the cleaned/validated data.
        next(); // Validation succeeded. Continue to the next middleware/controller.
    }
}

export default validate;