const { commonMethods } = require('../../utils/common');
const UserService = require('../../services/User/User.service');
const AuthService = require('../../services/Auth/auth.service');
const EncrypterService = require('../../services/Encrypter/encrypter.service');

/* -------- USER CONTROLLER -------- */

/**
 *  Add Admin.
 * @public
 */

const addAdmin = async (req, res, next) => {
   try {
      const { firstName, lastName, email, password, country } = req.body;

      if(req.user.role !== "admin"){
         commonMethods.handleApiResponse(res, true, {}, "UnAuthorized.");  
         return;
      }

      const isExist = await AuthService.findUserByEmailOrUserName(email);
      if(isExist){
         commonMethods.handleApiResponse(res, true, {}, "Email already in use.");  
         return;
      }


      // Add admin
      const params = {
         firstName,
         lastName,
         country,
         email,
         role: 'admin',
         password: EncrypterService.hashEncrypt(password),
      }
      const data = await UserService.createUser(params);
      
      if(data) {
         console.log('Added successfully.');
         commonMethods.handleApiResponse(res, false, {}, "Success");
      } else {
         commonMethods.handleApiResponse(res, true, {}, "Error adding admin.");
      }

   } catch (err) {
      // logs.error("Error createCustomers function: " + err.message);
      commonMethods.handleApiResponse(res, true, {}, err.message);
   }
};


module.exports = {
   addAdmin,
};
