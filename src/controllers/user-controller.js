const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const find = require("lodash/find");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const omit = require("lodash/omit");
const trim = require("lodash/trim");

const { googleAuth, sheetInstance } = require("../config/api");
const keys = require("../config/keys");
const User = require("../models/user");
const UploadProgress = require("../models/upload-progress");
const {
  sendResetPasswordEmail,
  sendVerificationEmail,
} = require("../utils/emailService");
const response = require("../utils/response");
const {
  generateFileKey,
  generateSignedUrl,
  uploadToS3,
} = require("../utils/storageService");
const { uploadData, getSpreadSheetRows } = require("../utils/uploadData");
const {
  validateEmail,
  validateLoginInput,
  validateRegisterInput,
  validateUserInfoUpdate,
  validateUserUpdate,
} = require("../utils/validation");

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
}

async function setupVerification(user) {
  const token = crypto.randomBytes(20).toString("hex");
  user.verificationToken = token;
  user.verificationTokenExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  user.verificationEmailSent = Date.now();
  await user.save();

  await sendVerificationEmail(user, token);
}

async function setupPasswordReset(user) {
  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpiry = Date.now() + 3600000; // 1 hour

  await user.save();

  await sendResetPasswordEmail(user, token);
}

exports.checkEmail = async (req, res) => {
  const data = req.body;
  const { errors, isValid } = validateEmail(data);

  if (!isValid) {
    return response.validationError(res, errors.email);
  }

  try {
    const user = await User.findOne({ email: data.email.toLowerCase() });

    return response.success(res, {
      message: user ? "Email already exists" : "Email is available.",
      available: !user,
    });
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.registerUser = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return response.validationError(res, errors);
  }

  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (user) {
    return response.conflict(res, { message: "Email already exists" });
  }

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email.toLowerCase(),
    phone: req.body.phone,
    password: req.body.password,
    verified: false,
    role: "User",
    organizationName: req.body.organizationName,
    organizationRole: req.body.organizationRole,
    organizationRoleOther: req.body.organizationRoleOther || "",
    dentalPracticeRole: req.body.dentalPracticeRole || "",
    organizationState: req.body.organizationState,
    organizationNumber: req.body.organizationNumber,
    referralSource: req.body.referralSource,
    referralSourceOther: req.body.referralSourceOther || "",
  });

  try {
    newUser.password = await hashPassword(newUser.password);
    const savedUser = await newUser.save();

    await setupVerification(newUser);

    return response.success(res, {
      message:
        "User registered, please check your email to verify your account.",
      userId: savedUser.Id,
    });
  } catch (err) {
    return response.serverError(res, err.message);
  }
};

exports.sendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return response.validationError(res, "Email is required.");
    }

    const user = await User.findOne({
      active: true,
      email: email.toLowerCase(),
    });
    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    await setupVerification(user);

    return response.success(res, {
      message: "Verification email sent successfully.",
    });
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ active: true, email: email.toLowerCase() }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .json({ message: "Credentials incorrect. Please try again." });
    }

    if (!user.verified) {
      return res.status(401).json({
        message:
          "Account not verified. Please check your email to verify your account.",
      });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: token,
              user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
              },
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ message: "Credentials incorrect. Please try again." });
      }
    });
  });
};

exports.getAllUsers = (req, res) => {
  if (req.user.role !== "Admin") {
    return response.serverUnauthorized(res, "Unauthorized");
  }

  User.find()
    .select(
      "_id firstName lastName email role active verified organizationName verificationEmailSent organizationState"
    )
    .then((result) => res.json(result))
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Error occurred while reading the users.",
      });
    });
};

exports.updateUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return response.serverUnauthorized(res, "Unauthorized");
    }

    const { errors, isValid } = validateUserUpdate(req.body);

    if (!isValid) {
      return response.validationError(res, errors);
    }
    const { _id, firstName, lastName, email, role, verified } = req.body;

    const user = await User.findOne({ _id: _id, active: true });
    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email.toLowerCase();
    user.role = role;
    user.verified = verified;
    await user.save();

    return response.success(res, { message: "User updated successfully." });
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.deleteUser = (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "Invalid Request",
    });
  }

  User.findByIdAndRemove(req.params.id)
    .then(() => res.json(req.body))
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Not found with id " + req.params.id,
        });
      }

      return res.status(500).send({
        message: "Error deleting user with id " + req.params.id,
      });
    });
};

exports.deactivateUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return response.serverUnauthorized(res, "Unauthorized");
    }

    if (!req.body.id) {
      return response.validationError(res, "User id is required.");
    }

    const user = await User.findOne({ _id: req.body.id, active: true });
    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    user.active = false;
    await user.save();

    return response.success(res, { message: "User deactivated successfully." });
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.activateUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return response.serverUnauthorized(res, "Unauthorized");
    }

    if (!req.body.id) {
      return response.validationError(res, "User id is required.");
    }

    const user = await User.findOne({ _id: req.body.id });
    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    user.active = true;
    await user.save();

    return response.success(res, { message: "User activated successfully." });
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId, active: true });

    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    const userData = {
      id: user.id,
      email: user.email.toLowerCase(),
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      organizationName: user.organizationName,
      organizationRole: user.organizationRole,
      organizationRoleOther: user.organizationRoleOther || "",
      dentalPracticeRole: user.dentalPracticeRole || "",
      organizationState: user.organizationState,
      organizationNumber: user.organizationNumber,
      referralSource: user.referralSource,
      referralSourceOther: user.referralSourceOther || "",
      logo: user.logo ? generateSignedUrl(user.logo) : "",
      savedResults: user.savedResults || [],
      savedCalculators: user.savedCalculators || [],
    };

    return response.success(res, userData);
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.updateUserInfo = async (req, res) => {
  try {
    const { errors, isValid } = validateUserInfoUpdate(req.body);
    if (!isValid) {
      return response.validationError(res, errors);
    }

    const { firstName, lastName, phone, organizationName } = req.body;

    const userId = req.user.id;

    const user = await User.findOne({ _id: userId, active: true });
    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.organizationName = organizationName;

    await user.save();

    return response.success(res, { message: "User updated successfully." });
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return response.validationError(res, "Token is required.");
    }

    const query = {
      active: true,
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    };

    const user = await User.findOne(query);

    if (!user) {
      return response.badRequest(res, { message: "Invalid token." });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return response.success(res, { message: "Account verified successfully." });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.badRequest(res, {
        message: "Token has expired. Please request a new verification link.",
      });
    }

    return response.serverError(res, { message: error });
  }
};

exports.validateResetToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return response.validationError(res, "Token is required.");
    }

    const query = {
      active: true,
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    };

    const user = await User.findOne(query);

    return response.success(res, { valid: Boolean(user) });
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return response.validationError(res, "Email is required.");
    }
    const user = await User.findOne({
      active: true,
      email: email.toLowerCase(),
    });

    if (!user) {
      return response.notFoundError(res, "Email not found.");
    }

    await setupPasswordReset(user);

    return response.success(res, "Reset password email sent successfully.");
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.sendResetPassword = async (req, res) => {
  try {
    let userId = req.user.id;

    if (req.user.role !== "Admin" && req.body.id) {
      return response.serverUnauthorized(res, "Unauthorized");
    } else if (req.user.role === "Admin" && req.body.id) {
      userId = req.body.id;
    }

    const user = await User.findOne({ _id: userId, active: true });
    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    await setupPasswordReset(user);

    return response.success(res, {
      message: "Reset password email sent successfully.",
    });
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return response.validationError(res, {
        message: "Token and password are required.",
      });
    }

    const user = await User.findOne({
      active: true,
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return response.badRequest(res, "Invalid token.");
    }

    user.password = await hashPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    return response.success(res, { message: "Password reset successfully." });
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.uploadLogo = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId, active: true });
    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    const upload = uploadToS3(userId, "user", "logo").single("image");

    upload(req, res, async function (err) {
      if (err) {
        return response.serverError(res, err.message);
      }

      const key = generateFileKey(userId, "user", "logo", req.file);

      user.logo = key || "";
      user.save();
      return response.success(res, { message: "File uploaded successfully." });
    });
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

exports.saveResult = async (req, res) => {
  const data = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, keys.secretOrKey);
    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    if (user.savedResults && data.quiz) {
      const existingResult = find(user.savedResults, data.quiz);

      if (existingResult) {
        return response.success(res, {
          message: "Saved result successfully.",
        });
      }
    }

    data.id = new mongoose.Types.ObjectId();
    data.date = new Date();

    user.savedResults = user.savedResults
      ? [...user.savedResults, data]
      : [data];
    await user.save();

    return response.success(res, { message: "Saved result successfully." });
  } catch (error) {
    return response.badRequest(res, { message: "Failed to save result." });
  }
};

exports.updateSavedResult = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, keys.secretOrKey);
    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    if (!find(user.savedResults, (result) => String(result.id) === id)) {
      return response.badRequest(res, {
        message: "Saved result not found.",
      });
    }

    user.savedResults = user.savedResults.map((result) =>
      String(result.id) !== id ? result : { ...result, ...omit(data, ["id"]) }
    );

    await user.save();

    return response.success(res, {
      message: "Updated saved result successfully.",
    });
  } catch (error) {
    console.log(error);
    return response.badRequest(res, {
      message: "Failed to update saved result.",
    });
  }
};

exports.deleteSavedResult = async (req, res) => {
  const { id } = req.params;

  const successMessage = { message: "Deleted saved result successfully." };

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, keys.secretOrKey);
    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    if (!user.savedResults) {
      return response.success(res, successMessage);
    }

    user.savedResults = user.savedResults.filter(
      (result) => String(result.id) !== id
    );
    await user.save();

    return response.success(res, successMessage);
  } catch {
    return response.badRequest(res, {
      message: "Failed to delete saved result.",
    });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    return response.success(res, { valid: true });
  } catch (error) {
    return response.badRequest(res, { valid: false });
  }
};

exports.uploadCalculatorData = async (req, res) => {
  const { calculatorId, spreadsheetId, pageDataName, pageHeaderName } =
    req.body;

  if (req.user.role !== "Admin") {
    return response.serverUnauthorized(res, "Unauthorized");
  }

  try {
    const existingProgress = await UploadProgress.findOne({ calculatorId });

    if (existingProgress) {
      if (existingProgress.status === "STARTED") {
        return response.badRequest(
          res,
          `Data for ${calculatorId} calculator is being uploaded. Please wait and try again later.`
        );
      } else {
        await UploadProgress.deleteOne({ calculatorId });
      }
    }

    const rows = await getSpreadSheetRows(spreadsheetId, {
      pageName: pageDataName,
    });

    const rowsCount = rows.length;
    const columnsCount = rows[0].length;
    const totalCount = rowsCount - 1;

    if (totalCount <= 0) {
      return response.badRequest(res, {
        message: `Data for ${calculatorId} calculator is not correct`,
      });
    }

    const uploadProgress = new UploadProgress({
      user: req.user.email,
      calculatorId: calculatorId,
      total: totalCount,
      uploaded: 0,
      status: "STARTED",
    });

    const { _id: progressId } = await uploadProgress.save();

    response.success(res, {
      message: `Started uploading ${totalCount} ${
        totalCount === 1 ? "row" : "rows"
      } for ${calculatorId}`,
      progressId,
    });

    uploadData(req.body, progressId, { rowsCount, columnsCount });
  } catch (error) {
    return response.badRequest(res, {
      message: String(error),
    });
  }
};

exports.getUploadProgress = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const existingProgress = await UploadProgress.findOne({ _id });

    return response.success(res, existingProgress);
  } catch (error) {
    return response.badRequest(res, {
      message: String(error),
    });
  }
};

exports.saveCalculator = async (req, res) => {
  const { calculatorType } = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, keys.secretOrKey);
    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return response.notFoundError(res, "User not found.");
    }

    if (!calculatorType) {
      return response.badRequest(res, { message: "Calculator is required" });
    }

    if (user.savedCalculators?.includes(calculatorType)) {
      return response.success(res, {
        message: "Saved calculator successfully.",
      });
    }

    user.savedCalculators = user.savedCalculators
      ? [...user.savedCalculators, calculatorType]
      : [calculatorType];

    await user.save();

    return response.success(res, { message: "Saved calculator successfully." });
  } catch (error) {
    return response.badRequest(res, { message: "Failed to save calculator." });
  }
};
