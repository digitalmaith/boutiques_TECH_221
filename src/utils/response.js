function response(res, statusCode, data) {
    res.status(statusCode).json(data);
}

export default response;