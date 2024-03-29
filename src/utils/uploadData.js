const trim = require("lodash/trim");

const { googleAuth, sheetInstance } = require("../config/api");
const UploadProgress = require("../models/upload-progress");
const CALCULATOR_MODELS = require("../models/calculator-models");

const CHUNK_SIZE = 500;

function getSpreadSheetCellNumber(row, column) {
  let result = "";
  let n = column;

  while (n >= 0) {
    result = String.fromCharCode((n % 26) + 65) + result;
    n = Math.floor(n / 26) - 1;
  }

  result += `${row + 1}`;

  return result;
}

const saveDataWithSheetRange = async (
  payload,
  header,
  chunkNumber,
  progressId
) => {
  const { calculatorId, spreadsheetId, pageName } = payload;

  const start = getSpreadSheetCellNumber(
    chunkNumber * CHUNK_SIZE + (chunkNumber === 0 ? 1 : 0),
    0
  );
  const end = getSpreadSheetCellNumber(
    (chunkNumber + 1) * CHUNK_SIZE - 1,
    header.length - 1
  );

  const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
    auth: googleAuth,
    spreadsheetId,
    range: `${pageName}!${start}:${end}`,
  });

  const rows = infoObjectFromSheet.data.values;

  const data = rows.map((row) => {
    return header.reduce((acc, elem, idx) => {
      acc[elem] = trim(row[idx]);
      return acc;
    }, {});
  });

  const Model = CALCULATOR_MODELS[calculatorId];

  await Model.insertMany(data, { ordered: true });

  await UploadProgress.findOneAndUpdate(
    { _id: progressId },
    { $inc: { uploaded: data.length } }
  );
};

const uploadData = async (data, header, totalCount, progressId) => {
  const { calculatorId } = data;

  const Model = CALCULATOR_MODELS[calculatorId];

  await Model.deleteMany({});

  const chunks = Array(Math.ceil(totalCount / CHUNK_SIZE)).fill(0);

  try {
    for (let chunkNumber = 0; chunkNumber < chunks.length; chunkNumber += 1) {
      await saveDataWithSheetRange(data, header, chunkNumber, progressId);
    }
  } catch {}

  await UploadProgress.findOneAndUpdate(
    { _id: progressId },
    { status: "FINISHED" }
  );
};

module.exports = { uploadData };
