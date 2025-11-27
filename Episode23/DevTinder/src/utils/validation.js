const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email id is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};
const validateEditProfileFields = (req) => {
  const AllowedEditFields = [
    "firstName",
    "lastName",
    "about",
    "photoUrl",
    "skills",
    "age",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) => {
    return AllowedEditFields.includes(field);
  });
  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileFields };
