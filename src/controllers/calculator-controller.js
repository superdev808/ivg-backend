const BoneReductionModel = require("../models/bone-reduction-model");
const ChairSidePickUpModel = require("../models/chair-side-pickup-model");
const CrownMaterialModel = require("../models/crown-material-model");
const DrillKitAndSequenceModel = require("../models/drillkit_and_sequence_model");
const HealingAbutmentsModel = require("../models/healing-abutments-model");
const ImplantAnalogsModel = require("../models/implant-analog-model");
const ImplantsModel = require("../models/implant-model");
const ImplantScrewsModel = require("../models/implant-screw-model");
const ImpressingCopingsDirectToImplantsModel = require("../models/impressing-copings-direct-to-implant-model");
const ImpressingCopingsMUAsModel = require("../models/impressing-copings-mua-model");
const MUAsModel = require("../models/mua-model");
const RestorativeMultiUnitAbutmentsModel = require("../models/restorative-multi-unit-abutments-model");
const RestroativeDirectToImplantModel = require("../models/restroative-direct-to-implant-model");
const ScanbodyDriversDirectToImplantsModel = require("../models/scanbody-drivers-direct-to-implants-model");
const ScanbodyDriversMUAsModel = require("../models/scanbody-drivers-muas-model");
const ScanbodyModel = require("../models/scanbody-model");
const ScanbodyMUAsModel = require("../models/scanbody-mua-model");
const StockAbutmentsModel = require("../models/stock-abutments-model");
const TemporaryCopingsDirectToImplantsModel = require("../models/temporary-copings-direct-to-implants-model");
const TemporaryCopingsMUAsModel = require("../models/temporary-copings-muas-model");
const TiBasesDirectToImplantsModel = require("../models/ti-bases-direct-to-implant-model");
const TiBasesMUAsModel = require("../models/ti-bases-muas-model");
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
  RestroativeDirectToImplant: RestroativeDirectToImplantModel,
  RestorativeMultiUnitAbutments: RestorativeMultiUnitAbutmentsModel,
  HealingAbutments: HealingAbutmentsModel,
  ImplantAnalogs: ImplantAnalogsModel,
  ImplantScrews: ImplantScrewsModel,
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

exports.getCalculatorOptions = async (req, res, next) => {
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
      ).sort();
    } else {
      result = _.uniq(data.map((item) => item[fields[0]])).sort();
    }

    response.success(res, result);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};

exports.searchCalculator = async (req, res, next) => {
  const { text } = req.query;

  try {
    const modelNames = [];
    for (const modelName of Object.keys(modelMap)) {
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

    const result = getUniqueResult(data, fields);
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
    const { name, recipientsList, calculatorName, filename } = req.body;
    const pdfBuffer = req.file.buffer || null;

    if (!recipientsList || !name || !calculatorName || !filename) {
      return response.badRequest(res, { message: "Missing required fields." });
    }

    const emails = [...new Set(recipientsList.split("|"))];

    const info = {
      name,
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
    const { name, feedbackCategory, message, timestamp, fileName } = req.body;
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
    };

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
    const { name, feedbackCategory, calculatorName, message, timestamp } =
      req.body;
    if (!name || !feedbackCategory || !calculatorName) {
      return response.badRequest(res, { message: "Missing required fields." });
    }

    const info = {
      name,
      calculatorName,
      feedbackCategory,
      message,
      timestamp,
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
