const bodyParser = require('body-parser');
const { getCalculatorOptions, searchCalculator } = require("../controllers/calculator-controller");

class CalculatorRoutes {
    static getRoutes(app, router) {
        router.post("/materials", bodyParser.json(), getCalculatorOptions);
        router.get("/search", searchCalculator)
    }
}

module.exports = CalculatorRoutes;
