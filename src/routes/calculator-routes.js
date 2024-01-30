const bodyParser = require('body-parser');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getCalculatorOptions, searchCalculator, getAllOnXCalculatorOptions, sendAllOnXInfo } = require("../controllers/calculator-controller");

class CalculatorRoutes {
    static getRoutes(app, router) {
        router.post("/materials", bodyParser.json(), getCalculatorOptions);
        router.get("/search", searchCalculator);
        router.post("/allOnXCalculator", bodyParser.json(), getAllOnXCalculatorOptions);
        router.post('/sendAllOnXInfo', upload.single('attachment'), sendAllOnXInfo)
    }
}

module.exports = CalculatorRoutes;
