const CrownMaterialModel = require("../models/crown-material-model");
const ScanbodyModel = require("../models/scanbody-model");
const response = require("../utils/response");
const _ = require("lodash");

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