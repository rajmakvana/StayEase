 
// Middleware to catch and log errors
module.exports = (fn) => {
    return (req , res , next) => {
        fn(req , res ,next).catch(err => next(err));
    } 
}