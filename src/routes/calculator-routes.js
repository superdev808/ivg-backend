const bodyParser = require("body-parser");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { checkAccessToken } = require("../middlewares/check-token-permission");
const {
  getCalculatorOptions,
  searchCalculator,
  sendCalculatorSummary,
  sendCalculatorFeedback,
  sendCalculatorHelpfulFeedback,
  getAnnouncements,
  createAnnouncement,
  getLatestAnnouncement,
  deleteAnnouncement,
  getCalculatorInfo,
  createNewCalculator,
} = require("../controllers/calculator-controller");

class CalculatorRoutes {
  static getRoutes(app, router) {
    router.post("/materials", bodyParser.json(), getCalculatorOptions);
    router.get("/search", searchCalculator);
    router.post(
      "/announcements/create",
      bodyParser.json(),
      checkAccessToken,
      createAnnouncement
    );
    router.post(
      "/announcements/delete",
      bodyParser.json(),
      checkAccessToken,
      deleteAnnouncement
    );
    router.get("/announcements/get_all", checkAccessToken, getAnnouncements);
    router.get(
      "/announcements/get_latest",
      checkAccessToken,
      getLatestAnnouncement
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
      upload.single("attachment"),
      sendCalculatorHelpfulFeedback
    );
    router.get("/calculatorInfo", getCalculatorInfo);
    router.post("/uploadNewCalculator", checkAccessToken, createNewCalculator);
  }
}

module.exports = CalculatorRoutes;
