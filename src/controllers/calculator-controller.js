const BoneReductionModel = require("../models/bone_reduction_model");
const ChairSidePickUpModel = require("../models/chairside_pickup_model");
const CrownMaterialModel = require("../models/crown-material-model");
const DrillKitAndSequenceModel = require("../models/drillkit_and_sequence_model");
const ImplantPurchaseModel = require("../models/implant_purchase_model");
const MasterImplantDriverModel = require("../models/master_implant_driver_model");
const ScanbodyModel = require("../models/scanbody-model");
const { getQuizData, getUniqueResult, getQuizQuery, getModelByCalculatorType } = require("../utils/helper");
const response = require("../utils/response");
const _ = require("lodash");

const fieldsToSearch = {
    'Scanbodies': ["Implant Brand", "Implant System", "Scanbody Item Number", "Manufacturer"],
    'Crown Materials': []
}
const modelMap = {
  BoneReduction: BoneReductionModel,
  ChairSidePickUp: ChairSidePickUpModel,
  DrillKitAndSequence: DrillKitAndSequenceModel,
  ImplantPurchase: ImplantPurchaseModel,
  MasterImplantDriver: MasterImplantDriverModel,
};
exports.getCalculatorOptions = async (req, res, next) => {
    const { type, quiz, fields } = req.body;

    const calculatorType = decodeURIComponent(type);

    let Model = null;

    switch (calculatorType) {
        case "Scanbodies":
            Model = ScanbodyModel;
            break;
        case "Crown Materials":
            Model = CrownMaterialModel;
            break;
        default:
            break;
    }

    if (!Model) {
        response.notFoundError(res, `${type} data is not existing`);
        return;
    }

    try {
        const query = quiz;
        const data = await Model.find(query);
        let result = [];
        if (fields.length > 1) {
            result = _.uniq(data.map((item) => {
                const res = {};
                fields.forEach(field => {
                    res[field] = item[field];
                });

                return res;
            }));
        } else {
            result = _.uniq(data.map((item) => item[fields[0]]));
        }

        response.success(res, result);
    } catch (ex) {
        response.serverError(res, { message: ex.message });
    }
}

exports.searchCalculator = async (req, res, next) => {
    const { text } = req.query;
    const modelNameMap = {'Scanbodies': ScanbodyModel, 'Crown Materials': CrownMaterialModel};

    try {
        const modelNames = [];
        for (const modelName of Object.keys(modelNameMap)) {
            const orFields = fieldsToSearch[modelName].map((field) => ({
                [field]: { $regex: new RegExp(text, 'i') }
            }));

            if (orFields.length) {
                const results = await modelNameMap[modelName].find({
                    $or: orFields
                });

                if (results.length) {
                    modelNames.push(modelName)
                }
            }
        }
        return response.success(res, modelNames);
    } catch (ex) {
        response.serverError(res, { message: ex.message });
    }
}

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

      quizResponse = await getQuizData(OutputModel, quiz, true);
    }
    // Handle case where data array is empty
    if (data.length === 0) {
      return response.notFoundError(res, `No data found`);
    }
    const result = getUniqueResult(data, fields);
    const resp = { result };
    if (quizResponse) {
      resp["quizResponse"] = quizResponse;
    }
    response.success(res, resp);
  } catch (ex) {
    response.serverError(res, { message: ex.message });
  }
};
  
  