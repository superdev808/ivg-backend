const _ = require("lodash");
const { createModel } = require("../models/schema");
const mongoose = require("mongoose");

/**
 * function to get the appropriate model based on the calculator type.
 * @param {string} key - The calculator type.
 * @returns {Object|null} - The model corresponding to the calculator type, or null if not found.
 */
const getModelByCalculatorType = (key = "") => {
  try {
    return mongoose.model(key);
  } catch {
    return createModel(key, key);
  }
};

const sortCalculatorOptions = (a, b) => {
  if (typeof a !== "string" || typeof b !== "string") {
    return 0;
  }
  const priotizedBrands = [
    "straumann",
    "neodent",
    "zimvie",
    "nobel biocare",
    "dentsply sirona",
    "biohorizons",
  ];

  if (
    priotizedBrands.includes(a.toLowerCase()) &&
    !priotizedBrands.includes(b.toLowerCase())
  ) {
    return -1;
  } else if (
    !priotizedBrands.includes(a.toLowerCase()) &&
    priotizedBrands.includes(b.toLowerCase())
  ) {
    return 1;
  }

  const aFloatValue = parseFloat(a);
  const bFloatValue = parseFloat(b);

  if (aFloatValue < bFloatValue) {
    return -1;
  } else if (aFloatValue > bFloatValue) {
    return 1;
  } else {
    return a.localeCompare(b);
  }
};

// Function to convert image data to Data URI
const imageToDataURI = (bitmap, fileName) => {
  // Convert binary data to base64 encoded string
  const base64Image = Buffer.from(bitmap).toString("base64");

  // Get image file extension
  const ext = fileName.split(".").pop();

  // Construct Data URI
  const uri = `data:image/${ext};base64,${base64Image}`;

  return uri;
};

module.exports = {
  getModelByCalculatorType,
  sortCalculatorOptions,
  imageToDataURI,
};
