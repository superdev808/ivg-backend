const bodyParser = require('body-parser');
const { getCalculatorOptions } = require("../controllers/calculator-controller");

class CalculatorRoutes {
    static getRoutes(app, router) {
        router.post("/materials", bodyParser.json(), getCalculatorOptions);
    }
}

module.exports = CalculatorRoutes;
