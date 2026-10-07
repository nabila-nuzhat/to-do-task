/**
 * The inner function can still use schema after validate has finished running. This is a closure:
     a function that keeps access to variables from the scope where it was created.
 * Returned function:	Middleware function	(req, res, next) => void
 * 
 */