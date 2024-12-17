// messages.js

const messages = {
    success:{
        update: function(params) {
            return `Customer with ${params.receiver} has been updated successfully`;
        },
    },
    error: {
        genericMsg: "An error occured. Please try again later.",
        update: "Failed to update Contacts",
        invalidAPiKey: "Invalid apiKey.",
        incorretOldPassword: "Incorrect Old Password",
        invalidLoginCredentials: "Invalid Email or Password",
        invalidToken: "Invalid Token",
        passwordUpdateFailed: "Failed to update password.",
        updateSuccess: "Updated successfully",
        userNotFound: "User not found. Please check the email id, and try again.",
        forgetPasswordExpired: "Link has expired",
    },
    validation: {},
    policy: {
        password: 'Password must be at least 8 characters long and contain at least 1 Uppercase letter, 1 number, and 1 special character from the set: @, $, !, %, *, ?, &.'
    }
};

module.exports = messages;
  