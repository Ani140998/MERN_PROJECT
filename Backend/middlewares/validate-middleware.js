
// This is our middleware to check or validate with zodSchema that we have created using "ZOD".
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();

    } catch (err) {
        
        const status = 400;
        const message = "Fill the field properly";
        const extraDetails = err.errors[0].message;
        const error = {
            status,
            message,
            extraDetails
        }

        next(error);
        // res.status(400).json("Validation Error",error);
    }
};

module.exports = validate;