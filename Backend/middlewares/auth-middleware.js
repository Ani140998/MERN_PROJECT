const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

    const token = req.header("Authorization");          //---- Taking token from client-side ------
    const JWT_SECRET_KEY = "HELLOMYNAMEISANKITRAMJIGUPTA";

    if(!token){
        // If you attempt to use an expired token, you will receive an HTTP error.
        return res.status(400).json("Unautorized, token not provided");
    }


    // Token from client side is in the format "Bearer <your_jwt_token_here>", we will extract token after Bearer.
    const jwtToken = token.replace("Bearer", "").trim();

    try {
        
        // ------ Verifying Token ------
        const isVerified = jwt.verify(jwtToken, JWT_SECRET_KEY);
        req.user = isVerified;            // handing userdata in auth-controllers.user function
        req.token = token;


        // Moving on to the next middleware or route handler
        next();                         

    } catch (error) {
        
        res.status(400).json({msg: "Unauthorized User"});
    }
   
}

module.exports = authMiddleware;