const { google } = require("googleapis");

const googleAuth = new google.auth.JWT(
  process.env.GOOGLE_API_CLIENT_EMAIL,
  null,
  atob(process.env.GOOGLE_API_PRIVATE_KEY).replace(/\\n/g, "\n"),
  "https://www.googleapis.com/auth/spreadsheets"
);

const sheetInstance = google.sheets({
  version: "v4",
  auth: googleAuth,
});

module.exports = { googleAuth, sheetInstance };
