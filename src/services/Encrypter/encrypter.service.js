// services/Encrypter.service.js
const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; // AES-256-CBC algorithm
const masterPassphrase = 'your-super-secret-passphrase';
const salt = crypto.randomBytes(16);
const iterations = 100000;
const keyLength = 32;

const key = crypto.pbkdf2Sync(masterPassphrase, salt, iterations, keyLength, 'sha256');

const EncrypterService = {
    hashEncrypt: function(inputData) {
        
        // Create a hash object with the 'sha256' algorithm
        const hash = crypto.createHash('sha256');
        
        // Update the hash object with the input data
        hash.update(inputData);
        
        // Generate the hash (digest) in hexadecimal format
        const hashedPassword = hash.digest('hex');
        
        return hashedPassword;
    },
    encrypt: function(text) {
        const hexString = 'a3a90f121a7d8d14cc48e953d2fc7a73';
        const iv = Buffer.from(hexString, 'hex');        
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf-8', 'base64');
        encrypted += cipher.final('base64');
        return `${iv.toString('hex')}:${encrypted}`;
    },
    decrypt: function(encryptedText) {
        const [ivHex, encrypted] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encrypted, 'base64', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
  }
  
  module.exports = EncrypterService;