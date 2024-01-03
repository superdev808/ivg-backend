const bodyParser = require('body-parser');
const { getCalculatorOptions, searchCalculator, getAllOnXCalculatorOptions } = require("../controllers/calculator-controller");

class CalculatorRoutes {
    static getRoutes(app, router) {
        router.post("/materials", bodyParser.json(), getCalculatorOptions);
        router.get("/search", searchCalculator);
        router.post("/allOnXCalculator", bodyParser.json(), getAllOnXCalculatorOptions);
    }
}

module.exports = CalculatorRoutes;
