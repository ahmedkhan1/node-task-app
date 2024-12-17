// Common File
const jwt = require('jsonwebtoken');
const {secret} = require("../config/auth.config");
const messages = require('./messages');
const crypto = require('crypto');
const log = require('../../logger');


const generateErrorCode = (type) => {
    switch(type){
        case "userName":
            return 5001;
        case "email":
            return 5002;
        case "password":
            return 5003;
        case messages.error.incorretOldPassword:
            return 5004;
        case messages.error.invalidAPiKey:
            return 50014;
        default:
            return 5000;
    }
};

// This object contains several common methods
const commonMethods = {
    /*This function generates a JWT token for authentication*/
    generateJwtToken: (userdata, expiryTime = "180d") => {
        console.log("expiryTime:", expiryTime);
        const option = (expiryTime)? { algorithm: 'HS256', expiresIn: expiryTime } : { algorithm: 'HS256' };
        const token = jwt.sign({ ...userdata }, secret, option);
        return token;
    },
    validateJwtToken: (apiKey) => {
        return new Promise((resolve)=>{
            jwt.verify(apiKey, secret, (error, decoded) => {
                if (error) resolve(false);
                else resolve(decoded);
            });
        })
    },
    handleApiResponse: (res, error, data, message) => {
        if (error) {
            const statusCode = generateErrorCode(message);
            log.error("Error message:", message);
            
            res.send({
                statusCode: (statusCode)? statusCode : 500,
                message: "Failed",
                error: (message)? message : "Internal Server Error"
            });
        } else {
            res.send({
                statusCode: 200,
                message,
                data
            });
        }
    },
    enocdeintoBase64(inputString){
        return Buffer.from(inputString).toString('base64');
    },
    decodeBase64(encodedString){
        return Buffer.from(encodedString, 'base64').toString('utf-8');
    }
};


module.exports = {
    commonMethods,
    generateErrorCode
};