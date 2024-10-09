const jwt = require("jsonwebtoken");
const secretKey = "lighter";


const validToken = async (req, res, next) => {
    
    // get accessToken from req
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    
    if(!accessToken) {
        return res.status(401).json({ message: " Access denied.No token Provide "});
    }

    // Verified token with secret key and token
    try {
        jwt.verify(accessToken, secretKey)
        next();

    } catch (error) {
        // console.log(error.name);
        if( error.name === "TokenExpiredError" ) {
            const expireAccessToken = jwt.decode(accessToken);
            console.log(expireAccessToken);

            
            
        }
        res.status(400).json("Invalid Token")
    }
}




module.exports = validToken;