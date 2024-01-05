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

/**
 * Formats the quiz response containing information about implant drill kit and drill sequence.
 * @param {Object} quizResponse - The quiz response object.
 * @returns {Array} - Formatted quiz response with labeled information or [] if the input is invalid.
 */
const formatDrillkitAndSequence = (quizResponse = null) => {
  // Check if the quizResponse is valid
  if (!quizResponse) {
    return [];
  }

  // Destructure relevant information from the quizResponse
  const {
    _doc: {
      'Implant Drill Kit Name': implantDrillKitName,
      'Drill Kit Item Number': drillKitItemNumber,
      'Link to Drill Kit': linkToDrillKit,
      ...restDrills
    },
  } = quizResponse;

  // Copy the remaining drill data into a new object
  const drillsData = { ...restDrills };

  // Initialize an array to store the converted drill information
  const convertedDrillsArray = [];

  // Iterate over the drill data
  for (let i = 1; drillsData[`Drill ${i}`]; i++) {
    const nameKey = `Drill ${i}`;
    const linkKey = `${nameKey} Link to Purchase`;
    const itemNumberKey = `${nameKey} Item Number`;

    // Extract individual drill details
    const itemName = drillsData[nameKey] || null;
    const link = drillsData[linkKey] || null;
    const itemNumber = drillsData[itemNumberKey] || null;
    const quantity = !!link ? 1 : null;

    // Check if the name is not null before adding to the array
    if (itemName !== null && itemName !== "No Drill Sequence") {
      convertedDrillsArray.push({ itemName, link, itemNumber, quantity });
    }
  }

  // Format the final response with labeled information
  return [
    {
      label: "Implant Drill Kit Name",
      info: [
        {
          itemName: implantDrillKitName,
          itemNumber: drillKitItemNumber,
          link: linkToDrillKit,
          quantity: !!linkToDrillKit ? 1 : null
        }
      ]
    },
    {
      label: "Drill Sequence",
      info: convertedDrillsArray
    },
  ];
};

const formatBoneReduction = (quizResponse = null) => {
  // Check if the quizResponse is valid
  if (!quizResponse || _.isEmpty(quizResponse._doc)) {
    return [];
  }
  // Destructure relevant information from the quizResponse
  const {
    _doc: {
      "Bur Kit Name (Bone Reduction)": burKitName = "",
      "Bur Kit Product Code": burKitItemNumber = "",
      "Bur Kit Link to Purchase": linkToBurKit = "",
      "Surgical Bur Kit (Denture Conversion)": surgicalBurKit = ""
    },
  } = quizResponse;
  const [itemName = "", link = ""] = surgicalBurKit.split("\n");
  
  return [
    {
      label: "Bur Kit Name (Bone Reduction)",
      info: [
        {
          itemName: burKitName,
          itemNumber: burKitItemNumber,
          link: linkToBurKit,
          quantity: !!linkToBurKit ? 1 : null
        }
      ]
    },
    {
      label: "Surgical Bur Kit (Denture Conversion)",
      info: [
        {
          itemName,
          itemNumber: null,
          link,
          quantity: !!link ? 1 : null
        }
      ]
    },
  ];
}

const formatMasterImplantDriver = (quizResponse = null) => {
  // Check if the quizResponse is valid
  if (!quizResponse || _.isEmpty(quizResponse._doc)) {
    return [];
  }
  const {
    _doc: {
      "Driver Name": itemName = "",
      "Item Number": itemNumber = null,
      "Link to Purchase": link = null,
    },
  } = quizResponse;
  return [
    {
      label: "Implant Driver",
      info: [
        {
          itemName,
          itemNumber,
          link,
          quantity: !!link ? 1 : null
        }
      ]
    }
  ]
}

const formatChairSidePickUp = (quizResponse = null) => {
  // Check if the quizResponse is valid
  if (!quizResponse || _.isEmpty(quizResponse._doc)) {
    return [];
  }
  const {
    _doc: {
      "Luting Agent Name": lutingAgentName = "",
      "Luting Agent Link to Purchase": lutingAgentLink = null,
      "Teflon Tape": teflonTape = "",
      "Teflon Tape Link to Purchase": teflonTapeLink = null,
      "Material to close screw access hole Name": materialName = "",
      "Material to close screw access hole link to purchase": materialLink = null,
    }
  } = quizResponse;
    
  return [
    {
      label: "Luting Agent",
      info: [
        {
          itemName: lutingAgentName,
          itemNumber: null,
          link: lutingAgentLink,
          quantity: !!lutingAgentLink ? 1 : null
        }
      ]
    },
    {
      label: "Teflon Tape",
      info: [
        {
          itemName: teflonTape,
          itemNumber: null,
          link: teflonTapeLink,
          quantity: !!teflonTapeLink ? 1 : null
        }
      ]
    },
    {
      label: "Material to Close Screw Access Hole",
      info: [
        {
          itemName: materialName,
          itemNumber: null,
          link: materialLink,
          quantity: !!materialLink ? 1 : null
        }
      ]
    }
  ];
}

const formatImplantPurchase = (quizResponse = null) => {
  // Check if the quizResponse is valid
  if (!quizResponse || _.isEmpty(quizResponse._doc)) {
    return [];
  }
  const {
    _doc: {
      "Implant Name": implantName = "",
      "Link to purchase": link = null,
      "Article Number": itemNumber = ""
    }
  } = quizResponse;
  return [
    {
      label: "Implant",
      info: [
        {
          itemName: implantName,
          itemNumber,
          link,
          quantity: !!link ? 1 : null
        }
      ]
    }
  ]
}

module.exports = {
  getModelByCalculatorType,
  getQuizData,
  getQuizQuery,
  getUniqueResult,
  formatDrillkitAndSequence,
  formatBoneReduction,
  formatMasterImplantDriver,
  formatChairSidePickUp,
  formatImplantPurchase
};
