const BoneReductionModel = require("../models/bone-reduction-model");
const ChairSidePickUpModel = require("../models/chair-side-pickup-model");
const CrownMaterialModel = require("../models/crown-material-model");
const DrillKitAndSequenceModel = require("../models/drillkit_and_sequence_model");
const HealingAbutmentsModel = require("../models/healing-abutments-model");
const ImplantAnalogsModel = require("../models/implant-analog-model");
const ImplantsModel = require("../models/implant-model");
const ImplantScrewsModel = require("../models/implant-screw-model");
const ImplantTorquesModel = require("../models/implant-torque-model");
const ImpressingCopingsDirectToImplantsModel = require("../models/impressing-copings-direct-to-implant-model");
const ImpressingCopingsMUAsModel = require("../models/impressing-copings-mua-model");
const MUAsModel = require("../models/mua-model");
const RestorativeMultiUnitAbutmentsModel = require("../models/restorative-multi-unit-abutments-model");
const RestorativeDirectToImplantModel = require("../models/restorative-direct-to-implant-model");
const ScanbodyDriversDirectToImplantsModel = require("../models/scanbody-drivers-direct-to-implants-model");
const ScanbodyDriversMUAsModel = require("../models/scanbody-drivers-muas-model");
const ScanbodyModel = require("../models/scanbody-model");
const ScanbodyMUAsModel = require("../models/scanbody-mua-model");
const StockAbutmentsModel = require("../models/stock-abutments-model");
const TemporaryCopingsDirectToImplantsModel = require("../models/temporary-copings-direct-to-implants-model");
const TemporaryCopingsMUAsModel = require("../models/temporary-copings-muas-model");
const TiBasesDirectToImplantsModel = require("../models/ti-bases-direct-to-implant-model");
const TiBasesMUAsModel = require("../models/ti-bases-muas-model");
const AnnouncementsModel = require("../models/announcement-model");
const { OUTPUT_TYPES, LABEL_MAPPINGS } = require("../utils/constant");
const {
  sendCalculatorSummaryEmail,
  sendCalculatorFeedbackEmail,
  sendCalculatorHelpfulFeedbackEmail,
} = require("../utils/emailService");
const {
  getQuizData,
  getUniqueResult,
  getQuizQuery,
  getModelByCalculatorType,
  sortCalculatorOptions,
} = require("../utils/helper");
const {
  formatDrillkitAndSequence,
  formatBoneReduction,
  formatChairSidePickUp,
  formatCommonResponse,
  formatScanbodies,
} = require("../utils/outputFormatter");
const response = require("../utils/response");
const _ = require("lodash");

const fieldsToSearch = {
  Scanbodies: [
    "Implant Brand",
    "Implant System",
    "Scanbody Item Number",
    "Manufacturer",
  ],
  "Crown Materials": [],
};

const modelMap = {
  BoneReduction: BoneReductionModel,
  ChairSidePickUp: ChairSidePickUpModel,
  DrillKitAndSequence: DrillKitAndSequenceModel,
  Scanbodies: ScanbodyModel,
  "Crown Materials": CrownMaterialModel,
  RestorativeDirectToImplant: RestorativeDirectToImplantModel,
  RestorativeMultiUnitAbutments: RestorativeMultiUnitAbutmentsModel,
  HealingAbutments: HealingAbutmentsModel,
  ImplantAnalogs: ImplantAnalogsModel,
  ImplantScrews: ImplantScrewsModel,
  ImplantTorques: ImplantTorquesModel,
  Implants: ImplantsModel,
  ImpressingCopingsDirectToImplants: ImpressingCopingsDirectToImplantsModel,
  ImpressingCopingsMUAs: ImpressingCopingsMUAsModel,
  MUAs: MUAsModel,
  ScanbodyMUAs: ScanbodyMUAsModel,
  ScanbodyDriversDirectToImplants: ScanbodyDriversDirectToImplantsModel,
  ScanbodyDriversMUAs: ScanbodyDriversMUAsModel,
  StockAbutments: StockAbutmentsModel,
  TemporaryCopingsDirectToImplants: TemporaryCopingsDirectToImplantsModel,
  TemporaryCopingsMUAs: TemporaryCopingsMUAsModel,
  TiBasesDirectToImplants: TiBasesDirectToImplantsModel,
  TiBasesMUAs: TiBasesMUAsModel,
};

exports.getCalculatorOptions = async (req, res) => {
  const { type, quiz, fields } = req.body;

  const calculatorType = decodeURIComponent(type);

  const Model = getModelByCalculatorType(modelMap, calculatorType);

  if (!Model) {
    response.notFoundError(res, `${type} data is not existing`);
    return;
  }

  try {
    const query = quiz;
    const data = await Model.find(query);

    let result = [];

    if (fields.length > 1) {
      result = _.uniq(
        data.map((item) => {
          const res = {};
          fields.forEach((field) => {
            res[field] = item[field];
          });

          return res;
        })
      ).sort(sortCalculatorOptions);
    } else {
      result = _.uniq(data.map((item) => item[fields[0]])).sort(
        sortCalculatorOptions
      );
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
    for (const modelName of Object.keys(modelMap)) {
      if (fieldsToSearch[modelName]) {
        const orFields = fieldsToSearch[modelName].map((field) => ({
          [field]: { $regex: new RegExp(text, "i") },
        }));

        if (orFields.length) {
          const results = await modelMap[modelName].find({
            $or: orFields,
          });

          if (results.length) {
            modelNames.push(modelName);
          }
        }
      }
    }
    return response.success(res, modelNames);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};

/**
 * Controller function to get options based on a specific calculator type.
 * @param {Object} req - Express request object with properties { type, quiz, fields, output }.
 * @param {Object} res - Express response object.
 */
exports.getAllOnXCalculatorOptions = async (req, res) => {
  try {
    // Destructure relevant properties from the request body
    const { type = "", quiz = {}, fields = [], output = "" } = req.body;

    const decodedCalculatorType = decodeURIComponent(type);

    const Model = getModelByCalculatorType(modelMap, decodedCalculatorType);

    // Check if the calculator type exists in the model map
    if (!Model) {
      return response.notFoundError(
        res,
        `${decodedCalculatorType} data does not exist`
      );
    }

    const quizData = await getQuizData(Model);
    const quizQuery = getQuizQuery(quizData, quiz) || {};
    // Fetch data from the selected model based on the quiz
    const data = await Model.find(quizQuery);

    let quizResponse = null;

    if (output) {
      const OutputModel = getModelByCalculatorType(modelMap, output);

      if (!OutputModel) {
        return response.notFoundError(
          res,
          `${decodedCalculatorType} data does not exist`
        );
      }
      const quizOutputData = await getQuizData(OutputModel);
      const quizOutputQuery = getQuizQuery(quizOutputData, quiz) || {};

      quizResponse = await getQuizData(OutputModel, quizOutputQuery, true);
      if (quizResponse) {
        switch (output) {
          case OUTPUT_TYPES.DRILL_KIT_AND_SEQUENCE:
            quizResponse = formatDrillkitAndSequence(quizResponse);
            break;
          case OUTPUT_TYPES.BONE_REDUCTION:
            quizResponse = formatBoneReduction(quizResponse);
            break;
          case OUTPUT_TYPES.CHAIR_SIDE_PICK_UP:
            quizResponse = formatChairSidePickUp(quizResponse);
            break;
          case OUTPUT_TYPES.SCANBODIES:
          case OUTPUT_TYPES.SCANBODYMUAS:
            quizResponse = formatScanbodies(quizResponse);
            break;
          default:
            quizResponse = formatCommonResponse(
              quizResponse,
              LABEL_MAPPINGS[output] || output
            );
        }
      }
    }

    const result = getUniqueResult(data, fields).sort(sortCalculatorOptions);
    if (result.length === 0) {
      result.push("");
    }

    const resp = { result };

    if (quizResponse) {
      resp["quizResponse"] = quizResponse;
    }

    response.success(res, resp);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};

exports.sendCalculatorSummary = async (req, res) => {
  try {
    const { recipientsList, calculatorName, filename } = req.body;
    const pdfBuffer = req.file.buffer || null;

    if (!recipientsList || !calculatorName || !filename) {
      return response.badRequest(res, { message: "Missing required fields." });
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
      userAnswers
    } = req.body;
    const imageBuffer = req.file?.buffer || null;

    if (!name || !feedbackCategory || !message) {
      return response.badRequest(res, { message: "Missing required fields." });
    }

    const info = {
      name,
      feedbackCategory,
      message,
      imageBuffer,
      timestamp,
      fileName,
      userAnswers: JSON.parse(userAnswers),
      calculatorName
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
    const { name, feedbackCategory, calculatorName, message, timestamp, quiz, fileName } =
      req.body;
    if (!name || !feedbackCategory || !calculatorName) {
      return response.badRequest(res, { message: "Missing required fields." });
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
      imageBuffer
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
    const results = await AnnouncementsModel.find({})
    return response.success(res, results);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
}

exports.createAnnouncement = async (req, res) => {
  if (req.user.role !== "Admin") {
    return response.serverUnauthorized(res, "Unauthorized");
  }
  try {
    const { content, _id } = req.body;
    let announcement;
    if (_id != undefined)
      announcement = await AnnouncementsModel.findById(_id);
    else
      announcement = new AnnouncementsModel({ content });
    announcement.content = content;
    announcement.published_at = new Date();
    const result = await announcement.save();
    return response.success(res, result);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
}

exports.getLatestAnnouncement = async (req, res) => {
  if (req.user.role !== "Admin") {
    return response.serverUnauthorized(res, "Unauthorized");
  }
  try {
    const latest = await AnnouncementsModel.findOne({  }, {}, { sort: { 'published_at' : -1 } }).exec()
    // 7 days = 7 * 24 * 60 * 60 * 1000 ms
    const expiredMs = 7 * 24 * 60 * 60 * 1000;
    if (latest.published_at < new Date(new Date() - expiredMs))
      return response.success(res, null);
    return response.success(res, latest);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
}

exports.deleteAnnouncement = async (req, res) => {
  if (req.user.role !== "Admin") {
    return response.serverUnauthorized(res, "Unauthorized");
  }
  try {
    const {  _id } = req.body;
    const result = await AnnouncementsModel.findByIdAndDelete(_id)
    return response.success(res, result);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
}