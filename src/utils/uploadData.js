const trim = require("lodash/trim");

const { googleAuth, sheetInstance } = require("../config/api");
const UploadProgress = require("../models/upload-progress");
const CALCULATOR_MODELS = require("../models/calculator-models");
const MetaCalcModel = require("../models/meta-calc-model");

const CHUNK_SIZE = 500;
const META_FIELDS_COUNT = 5; // see the number of fields in the MetaCalcModel
const isCommonFields = [
  "Implant Brand",
  "Implant Model",
  "Implant Diameter",
  "Implant Platform",
];

function getSpreadSheetCellNumber(row, column) {
  let result = "";
  let n = column - 1;

  while (n >= 0) {
    result = String.fromCharCode((n % 26) + 65) + result;
    n = Math.floor(n / 26) - 1;
  }

  result += `${row}`;

  return result;
}

const getSpreadSheetRows = async (spreadsheetId, { pageName, start, end }) => {
  const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
    auth: googleAuth,
    spreadsheetId,
    range:
      start == undefined || end == undefined
        ? `${pageName}`
        : `${pageName}!${start}:${end}`,
  });

  const rows = infoObjectFromSheet.data.values;
  return rows;
};

const saveHeaders = async (sheetInfo, columnsCount) => {
  const { calculatorId, spreadsheetId, pageHeaderName } = sheetInfo;

  try {
    await MetaCalcModel.deleteMany({ calculatorId });

    let headers = await getSpreadSheetRows(spreadsheetId, {
      pageName: pageHeaderName,
      start: getSpreadSheetCellNumber(1, 2),
      end: getSpreadSheetCellNumber(META_FIELDS_COUNT, columnsCount + 1),
    });
    for (let i = 0; i < META_FIELDS_COUNT; ++i)
      if (headers[i] == undefined || headers[i] == null || !headers[i].length)
        headers[i] = [];

    const metaCalcData = [];
    for (let i = 0; i < columnsCount; ++i) {
      metaCalcData.push({
        colIndex: i,
        colName: trim(headers[0][i] || ""),
        colText: trim(headers[1][i] || ""),
        groupId: trim(headers[2][i] || ""),
        groupName: trim(headers[3][i] || ""),
        groupText: trim(headers[4][i] || ""),
        isCommon: isCommonFields.includes(headers[0][i] || ""),
        calculatorType: calculatorId,
      });
    }
    MetaCalcModel.insertMany(metaCalcData, { ordered: true });
    return metaCalcData;
  } catch (error) {
    return [];
  }
};

const saveDataWithSheetRange = async (
  sheetInfo,
  progressId,
  { rowsCount, columnsCount, position }
) => {
  const { calculatorId, spreadsheetId, pageDataName } = sheetInfo;

  const rows = await getSpreadSheetRows(spreadsheetId, {
    pageName: pageDataName,
    start: getSpreadSheetCellNumber(position + 1, 1),
    end: getSpreadSheetCellNumber(
      Math.min(position + CHUNK_SIZE, rowsCount),
      columnsCount
    ),
  });

  const data = rows.map((row) => {
    return row.reduce((result, cur, index) => {
      result[index] = trim(cur);
      return result;
    }, {});
  });

  const Model = CALCULATOR_MODELS[calculatorId];

  await Model.insertMany(data, { ordered: true });

  await UploadProgress.findOneAndUpdate(
    { _id: progressId },
    { $inc: { uploaded: data.length } }
  );
};

const uploadData = async (
  sheetInfo,
  progressId,
  { rowsCount, columnsCount }
) => {
  const { calculatorId } = sheetInfo;

  try {
    await saveHeaders(sheetInfo, columnsCount);

    const Model = CALCULATOR_MODELS[calculatorId];
    await Model.deleteMany({});

    for (let position = 1; position < rowsCount; position += CHUNK_SIZE) {
      await saveDataWithSheetRange(sheetInfo, progressId, {
        rowsCount,
        columnsCount,
        position,
      });
    }
  } catch {}

  await UploadProgress.findOneAndUpdate(
    { _id: progressId },
    { status: "FINISHED" }
  );
};

module.exports = { uploadData, getSpreadSheetRows };
