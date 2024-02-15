const Validator = require("validator");
const isEmpty = require("is-empty");

const isBoolean = (value) =>
  value === true || value === false || value === "true" || value === "false";

exports.validateEmail = (data) => {
  data.email = !isEmpty(data.email) ? data.email : "";

  const errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is requied";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateLoginInput = (data) => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateRegisterInput = (data) => {
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.organizationName = !isEmpty(data.organizationName)
    ? data.organizationName
    : "";
  data.organizationRole = !isEmpty(data.organizationRole)
    ? data.organizationRole
    : "";
  data.organizationState = !isEmpty(data.organizationState)
    ? data.organizationState
    : "";
  data.organizationNumber = !isEmpty(data.organizationNumber)
    ? data.organizationNumber
    : "";
  data.referralSource = !isEmpty(data.referralSource)
    ? data.referralSource
    : "";

  // Name Checks
  if (Validator.isEmpty(data.firstName) || Validator.isEmpty(data.lastName)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is requied";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (
    !Validator.isLength(data.password, { min: 8, max: 30 }) &&
    validator.matches(
      data.password,
      "/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]+$/"
    )
  ) {
    errors.password =
      "Password must be at least 8 characters long and contain at least one letter, one number, and one special character";
  }

  if (Validator.isEmpty(data.organizationName)) {
    errors.organizationName = "Organization Name field is required";
  }

  if (Validator.isEmpty(data.organizationRole)) {
    errors.organizationRole = "Organization Role field is required";
  }

  if (Validator.isEmpty(data.organizationState)) {
    errors.organizationState = "Organization State field is required";
  }

  if (Validator.isEmpty(data.organizationNumber)) {
    errors.organizationNumber = "Organization Number field is required";
  }

  if (Validator.isEmpty(data.referralSource)) {
    errors.referralSource = "Referral Source field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateUserInfoUpdate = (data) => {
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  if (Validator.isEmpty(data.firstName) || Validator.isEmpty(data.lastName)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.isValidToken = (expiresUnixTimestamp) => {
  return new Date(new Date()) - new Date(expiresUnixTimestamp * 1000) < 0;
};

exports.validateContactForm = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.zip = !isEmpty(data.zip) ? data.zip : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.message = !isEmpty(data.message) ? data.message : "";
  data.token = !isEmpty(data.token) ? data.token : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is requied";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (Validator.isEmpty(data.zip)) {
    errors.zip = "Zip field is required";
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = "Role field is required";
  }

  if (data.role === "other" && Validator.isEmpty(data.message)) {
    errors.message = "Message field is required";
  }

  if (Validator.isEmpty(data.token)) {
    errors.token = "Invalid captcha";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateUserInfoUpdate = (data) => {
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  if (Validator.isEmpty(data.firstName) || Validator.isEmpty(data.lastName)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateUserUpdate = (data) => {
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  if (Validator.isEmpty(data.firstName) || Validator.isEmpty(data.lastName)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is requied";
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = "Role field is required";
  }

  if (!isBoolean(data.verified)) {
    errors.verified = "Verified field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.isValidToken = (expiresUnixTimestamp) => {
  return new Date(new Date()) - new Date(expiresUnixTimestamp * 1000) < 0;
};
