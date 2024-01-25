const _ = require("lodash");

/**
 * function to get the appropriate model based on the calculator type.
 * @param {string} key - The calculator type.
 * @param {Object} modelMap - Map of calculator types to corresponding models.
 * @returns {Object|null} - The model corresponding to the calculator type, or null if not found.
 */
const getModelByCalculatorType = (modelMap, key = "") => {
  return modelMap[key] || null;
};

/**
 * Retrieves quiz data from the specified Mongoose model based on the provided query.
 * @param {Object} QuizModel - The Mongoose model for the quiz.
 * @param {Object} query - The query to filter the quiz data. Defaults to an empty object.
 * @param {boolean} enableFilter - If true, excludes specified fields from the quiz data. Defaults to false.
 * @returns {Promise<Object>} - A promise that resolves to the quiz data from the model.
 */
const getQuizData = (QuizModel, query = {}, enableFilter = false) => {
  let filteredKey = { _id: 0 };
  if (enableFilter) {
    const excludedFields = {};
    Object.keys(query).forEach((key) => {
      excludedFields[key] = 0;
    });
    filteredKey = { ...filteredKey, ...excludedFields };
  }
  return QuizModel.findOne(query).select(filteredKey);
};

/**
 * function to filter quiz keys based on the provided quiz object.
 * @param {Object} quizData - The quiz data retrieved from the model.
 * @param {Object} quiz - The provided quiz object.
 * @returns {Object} - The filtered quiz object containing only keys present in quizData.
 */
const getQuizQuery = (quizData, quiz) => {
  const quizKeys = Object.keys(quizData._doc || {}).filter((key) =>
    quiz.hasOwnProperty(key)
  );
  return Object.fromEntries(
    Object.entries(quiz).filter(([key]) => quizKeys.includes(key))
  );
};

/**
 * function to get unique results based on specified fields.
 * @param {Array} data - The data array obtained from the model.
 * @param {Array} fields - The specified fields to extract unique results.
 * @returns {Array} - An array containing unique results based on the specified fields.
 */
const getUniqueResult = (data, fields) => {
  return _.uniq(
    _.sortBy(data.map((item) => {
      if (fields.length > 1) {
        const result = {};
        fields.forEach((field) => {
          if (field) result[field] = item[field];
        });
        return result;
      } else {
        return item[fields[0]];
      }
    })).filter(Boolean)
  );
};

module.exports = {
  getModelByCalculatorType,
  getQuizData,
  getQuizQuery,
  getUniqueResult,
};
