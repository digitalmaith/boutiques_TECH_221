function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json(errorFormatter(err));
}

function errorFormatter(err) {
    return {
        message: err.message,
        stack: err.stack,
        status: err.status || 500,
    };
}

export { errorHandler, errorFormatter };