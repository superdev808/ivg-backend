const bodyParser = require("body-parser");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  getCalculatorOptions,
  searchCalculator,
  getAllOnXCalculatorOptions,
  sendCalculatorSummary,
  sendCalculatorFeedback,
  sendCalculatorHelpfulFeedback,
} = require("../controllers/calculator-controller");

class CalculatorRoutes {
  static getRoutes(app, router) {
    router.post("/materials", bodyParser.json(), getCalculatorOptions);
    router.get("/search", searchCalculator);
    router.post(
      "/allOnXCalculator",
      bodyParser.json(),
      getAllOnXCalculatorOptions
    );
    router.post(
      "/sendCalculatorSummary",
      upload.single("attachment"),
      sendCalculatorSummary
    );
    router.post(
      "/sendCalculatorFeedback",
      upload.single("attachment"),
      sendCalculatorFeedback
    );
    router.post(
      "/sendHelpfulFeedback",
      bodyParser.json(),
      sendCalculatorHelpfulFeedback
    );
  }
}

module.exports = CalculatorRoutes;
