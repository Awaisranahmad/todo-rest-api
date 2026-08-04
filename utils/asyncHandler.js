// /**
//  * Utility middleware wrapper to handle async errors in Express routes.
//  * It eliminates the need to write repetitive try-catch blocks in every controller.
//  * 
//  * @param {Function} fn - The asynchronous controller/middleware function to execute.
//  * @returns {Function} A standard Express middleware function (req, res, next).
//  */
const asyncHandler = (fn) => (req, res, next) => {
    // Executes the passed function 'fn' inside a Promise.
    // If the promise resolves successfully, it works normally.
    // If it rejects (an error occurs), .catch(next) automatically forwards the error to Express's global error handler.
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
