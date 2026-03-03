import { errorFormatter } from "./errorHandler.js";

function validateMiddleware(schema) {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            const issues = error.issues || error.errors || [];
            const message = issues.map(e => e.message).join(", ") || "Payload invalide";
            next(errorFormatter({status: 400, message, stack: error.stack}));
        }
    };
}

export default validateMiddleware;
