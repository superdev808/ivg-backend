const CrownMaterialModel = require("../models/crown-material-model");
const ScanbodyModel = require("../models/scanbody-model");
const response = require("../utils/response");

class CalculatorRoutes {
    static getRoutes(app, router) {
        router.get("/crownMaterials", async (req, res, next) => {
            const data = await CrownMaterialModel.find();
            response.success(res, data);
        });

        router.get("/scanbodies", async (req, res, next) => {
            const data = await ScanbodyModel.find();
            response.success(res, data);
        });
    }
}

module.exports = CalculatorRoutes;
