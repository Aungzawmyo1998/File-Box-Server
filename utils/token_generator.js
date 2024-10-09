const jwt = require("jsonwebtoken");
const secretKey = "lighter";

// Access Token generator
const generateAccessToken = (userData) => {
    return jwt.sign(
        { id: userData.id, username: userData.username, email: userData.email, },
        secretKey,
        {expiresIn: "3m"}
    )
}

// Refresh Token generator
const generateRefreshToken = (userData) => {
    return jwt.sign(
        { id: userData.id, username: userData.username, email: userData.email, },
        secretKey,
        {expiresIn: "1h"}
    )
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}
