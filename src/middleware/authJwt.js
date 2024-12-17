const jwt = require('jsonwebtoken');
const {secret} = require("../config/auth.config");

// Middleware to validate the token
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).send("UnAuthorized");
  }
  
  const token = authHeader.replace(/^Bearer\s/, ''); // Remove "Bearer" prefix

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).end("Invalid Token");
    }

    req.user = decoded;
    next();
  });
};
module.exports = validateToken;
