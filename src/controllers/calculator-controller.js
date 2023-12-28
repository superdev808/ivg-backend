const CrownMaterialModel = require("../models/crown-material-model");
const ScanbodyModel = require("../models/scanbody-model");
const response = require("../utils/response");
const _ = require("lodash");

const fieldsToSearch = {
    'Scanbodies': ["Implant Brand", "Implant System", "Scanbody Item Number", "Manufacturer"],
    'Crown Materials': []
}

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