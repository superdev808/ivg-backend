const AnnouncementsModel = require("../models/announcement-model");
const {
  sendCalculatorSummaryEmail,
  sendCalculatorFeedbackEmail,
  sendCalculatorHelpfulFeedbackEmail,
} = require("../utils/emailService");
const {
  getModelByCalculatorType,
  sortCalculatorOptions,
} = require("../utils/helper");
const response = require("../utils/response");
const _ = require("lodash");
const MetaCalcModel = require("../models/meta-calc-model");
const CalculatorModel = require("../models/calculator-models");
const { createModel } = require("../models/schema");

const fieldsToSearch = {
  Scanbodies: [
    "Implant Brand",
    "Implant System",
    "Scanbody Item Number",
    "Manufacturer",
  ],
  "Crown Materials": [],
};

exports.getCalculatorOptions = async (req, res) => {
  const { type, quiz, fields } = req.body;

  const calculatorType = decodeURIComponent(type);

  const Model = getModelByCalculatorType(calculatorType);

  if (!Model) {
    response.notFoundError(res, `${type} data is not existing`);
    return;
  }

  try {
    const query = quiz;
    const data = (
      await Model.aggregate([
        {
          $match: query,
        },
        {
          $project: fields.reduce(
            (finalValue, field) => ({
              ...finalValue,
              [field]: 1,
            }),
            {}
          ),
        },
        {
          $group: {
            _id: fields.reduce(
              (finalValue, field) => ({
                ...finalValue,
                [field]: `$${field}`,
              }),
              {}
            ),
          },
        },
      ])
    ).map((item) => item["_id"]);

    let result = [];

    if (fields.length > 1) {
      result = data.sort(sortCalculatorOptions);
    } else {
      result = data
        .map((item) => item[fields[0]])
        .filter((data) => data)
        .sort(sortCalculatorOptions);
      if (result.length == 0) result = [""];
    }

    response.success(res, result);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};

exports.searchCalculator = async (req, res) => {
  const { text } = req.query;

  try {
    const modelNames = [];
    for (const modelName of Object.keys(fieldsToSearch)) {
      const headerIndexes = (
        await MetaCalcModel.find(
          {
            calculatorType: modelName,
            colName: {
              $in: fieldsToSearch[modelName],
            },
          },
          "colIndex"
        )
      ).map((item) => item["colIndex"]);

      const orFields = headerIndexes.map((field) => ({
        [field]: { $regex: new RegExp(text, "i") },
      }));
      if (orFields.length) {
        const results = await getModelByCalculatorType(modelName).find({
          $or: orFields,
        });

        if (results.length) {
          modelNames.push(modelName);
        }
      }
    }
    return response.success(res, modelNames);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};

exports.sendCalculatorSummary = async (req, res) => {
  try {
    const { recipientsList, calculatorName, filename } = req.body;
    const pdfBuffer = req.file.buffer || null;

    if (!recipientsList || !calculatorName || !filename) {
      return response.badRequest(res, {
        message: "Missing required fields.",
      });
    }

    const emails = [...new Set(recipientsList.split("|"))];

    const info = {
      emails,
      calculatorName,
      pdfBuffer,
      filename,
    };

    const result = await sendCalculatorSummaryEmail(info);

    if (result.body.Messages[0].Status === "success") {
      return response.success(res, "Email sent successfully.");
    }

    return response.serverError(res, { message: "Failed to send email" });
  } catch (ex) {
    return response.serverError(res, { message: ex.message });
  }
};

exports.sendCalculatorFeedback = async (req, res) => {
  try {
    const {
      name,
      feedbackCategory,
      message,
      timestamp,
      fileName,
      calculatorName,
      userAnswers,
    } = req.body;
    const imageBuffer = req.file?.buffer || null;

    if (!name || !feedbackCategory || !message) {
      return response.badRequest(res, {
        message: "Missing required fields.",
      });
    }

    const info = {
      name,
      feedbackCategory,
      message,
      imageBuffer,
      timestamp,
      fileName,
      userAnswers: JSON.parse(userAnswers),
      calculatorName,
    };

    console.log(info);

    const result = await sendCalculatorFeedbackEmail(info);

    if (result.body.Messages[0].Status === "success") {
      return response.success(res, "Email sent successfully.");
    }

    return response.serverError(res, { message: "Failed to send email" });
  } catch (ex) {
    return response.serverError(res, { message: ex.message });
  }
};

exports.sendCalculatorHelpfulFeedback = async (req, res) => {
  try {
    const {
      name,
      feedbackCategory,
      calculatorName,
      message,
      timestamp,
      quiz,
      fileName,
    } = req.body;
    if (!name || !feedbackCategory || !calculatorName) {
      return response.badRequest(res, {
        message: "Missing required fields.",
      });
    }

    const imageBuffer = req.file?.buffer || null;
    const info = {
      name,
      calculatorName,
      feedbackCategory,
      message,
      timestamp,
      quiz: JSON.parse(quiz),
      fileName,
      imageBuffer,
    };

    const result = await sendCalculatorHelpfulFeedbackEmail(info);

    if (result.body.Messages[0].Status === "success") {
      return response.success(res, "Email sent successfully.");
    }

    return response.serverError(res, { message: "Failed to send email" });
  } catch (ex) {
    return response.serverError(res, { message: ex.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  if (req.user.role !== "Admin") {
    return response.serverUnauthorized(res, "Unauthorized");
  }

  try {
    const results = await AnnouncementsModel.find({});
    return response.success(res, results);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  if (req.user.role !== "Admin") {
    return response.serverUnauthorized(res, "Unauthorized");
  }
  try {
    const { content, _id } = req.body;
    let announcement;
    if (_id != undefined) announcement = await AnnouncementsModel.findById(_id);
    else announcement = new AnnouncementsModel({ content });
    announcement.content = content;
    announcement.published_at = new Date();
    const result = await announcement.save();
    return response.success(res, result);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};

exports.getLatestAnnouncement = async (req, res) => {
  if (req.user.role !== "Admin") {
    return response.serverUnauthorized(res, "Unauthorized");
  }
  try {
    const latest = await AnnouncementsModel.findOne(
      {},
      {},
      { sort: { published_at: -1 } }
    ).exec();
    // 7 days = 7 * 24 * 60 * 60 * 1000 ms
    const expiredMs = 7 * 24 * 60 * 60 * 1000;
    if (latest.published_at < new Date(new Date() - expiredMs))
      return response.success(res, null);
    return response.success(res, latest);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  if (req.user.role !== "Admin") {
    return response.serverUnauthorized(res, "Unauthorized");
  }
  try {
    const { _id } = req.body;
    const result = await AnnouncementsModel.findByIdAndDelete(_id);
    return response.success(res, result);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};

exports.getCalculatorInfo = async (req, res) => {
  let basicCalculators = await CalculatorModel.getCalculators();
  let resultCalculators = basicCalculators.reduce(
    (result, cur) => ({
      ...result,
      [cur.type]: {
        type: cur.type,
        label: cur.label,
        description: cur.description,
        disabled: cur.disabled,
        isCustom: cur.isCustom,
        input: [],
        output: [],
      },
    }),
    {}
  );
  Object.keys(resultCalculators).forEach((key) => {
    resultCalculators[key]["input"] = [];
    resultCalculators[key]["output"] = [];
  });
  let headers = [];
  try {
    headers = await MetaCalcModel.find();
  } catch (error) {}
  headers.forEach((headerInfo) => {
    const {
      colIndex,
      colName,
      colText,
      groupId = "",
      groupName,
      groupText,
      isCommon,
      calculatorType,
    } = headerInfo;
    if (!(calculatorType in resultCalculators))
      resultCalculators[calculatorType] = {
        type: calculatorType,
        label: calculatorType,
        description: "",
        input: [],
        output: [],
      };
    resultCalculators[calculatorType][
      /input/gi.test(groupId) ? "input" : "output"
    ].push({
      colIndex,
      colName,
      colText,
      groupId,
      groupName,
      groupText,
      isCommon,
      calculatorType,
    });
  });
  Object.keys(resultCalculators).forEach((key) => {
    const compareFn = (left, right) => {
      return parseInt(left.colIndex) - parseInt(right.colIndex);
    };
    resultCalculators[key]["input"].sort(compareFn);
    resultCalculators[key]["output"].sort(compareFn);
  });
  return response.success(res, resultCalculators);
};

exports.createNewCalculator = async (req, res) => {
  if (req.user.role !== "Admin") {
    return response.serverUnauthorized(res, "Unauthorized");
  }
  try {
    const { type, label, description } = req.body;
    let calculator = await CalculatorModel.findOne({ type: type });
    console.log(calculator);
    if (calculator == null) {
      calculator = new CalculatorModel({
        type,
        label,
        description,
        collectionName: type,
      });
    } else {
      calculator.label = label;
      calculator.description = description;
    }
    const result = await calculator.save();
    createModel(calculator.type, calculator.collectionName);
    return response.success(res, result);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};
