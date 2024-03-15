const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateNewItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string-min": "Name must be at least 2 characters long",
      "string-max": "Name must be at most 30 characters long",
      "string-empty": "Name is required",
    }),
    imageUrl: Joi.string().custom(validateURL).required().messages({
      "string-empty": "Image Url is required",
      "string.uri": "Image Url must be a valid URL",
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold"),
  }),
});

module.exports.validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string-min": "Name must be at least 2 characters long",
      "string-max": "Name must be at most 30 characters long",
      "string-empty": "Name is required",
    }),
    avatar: Joi.string().custom(validateURL).required().messages({
      "string-empty": "Avatar is required",
      "string.uri": "Avatar must be a valid URL",
    }),
    email: Joi.string().email().required().messages({
      "string-empty": "Email is required",
    }),
    password: Joi.string().required().messages({
      "string-empty": "Password is required",
    }),
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string-min": "Name must be at least 2 characters long",
      "string-max": "Name must be at most 30 characters long",
      "string-empty": "Name is required",
    }),
    avatar: Joi.string().custom(validateURL).required().messages({
      "string-empty": "Avatar is required",
      "string.uri": "Avatar must be a valid URL",
    }),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string-empty": "Email is required",
    }),
    password: Joi.string().required().messages({
      "string-empty": "Password is required",
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).messages({
      "string-hex": "ID must be hexadecimal string",
      "string-length": "ID must be 24 characters in length",
    }),
  }),
});
