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
 *
 * @param {Object} Model - The Mongoose model for the calculator type.
 * @param {Object} query - The query to filter the quiz data. Defaults to an empty object.
 * @returns {Promise<Object>} - A promise that resolves to the quiz data from the model.
 */
const getQuizData = (Model, query = {}) =>
  Model.findOne(query).select({ _id: 0 });

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
    data.map((item) => {
      if (fields.length > 1) {
        const result = {};
        fields.forEach((field) => {
          if (field) result[field] = item[field];
        });
        return result;
      } else {
        return item[fields[0]];
      }
    })
  );
};

module.exports = {
  getModelByCalculatorType,
  getQuizData,
  getQuizQuery,
  getUniqueResult,
};
