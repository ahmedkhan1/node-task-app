const Joi = require('joi');
const { generateErrorCode } = require('../utils/common');
const pick = require('../utils/pick');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = (error.details)? error.details[0].message: "Error";
    const errorCode = generateErrorCode(error.details[0].path[1]);
    return next({
      statusCode: errorCode,
      message: errorMessage,
    });
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;