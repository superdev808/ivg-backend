const _ = require("lodash");
const { OUTPUT_LABELS } = require("./constant");

/**
 * Validates a quiz response to ensure it is not null and has a non-empty _doc property.
 * @param {Object} quizResponse - The quiz response object.
 * @returns {boolean} - True if the quiz response is valid, otherwise false.
 */
const validateQuizResponse = (quizResponse) =>
  quizResponse && !_.isEmpty(quizResponse._doc);

/**
 * Formats the quiz response containing information about implant drill kit and drill sequence.
 * @param {Object} quizResponse - The quiz response object.
 * @returns {Array} - Formatted quiz response with labeled information or [] if the input is invalid.
 */
const formatDrillkitAndSequence = (quizResponse = null) => {
  // Check if the quizResponse is valid
  if (!validateQuizResponse(quizResponse)) {
    return [];
  }

  // Destructure relevant information from the quizResponse
  const {
    _doc: {
      "Implant Drill Kit Name": implantDrillKitName,
      "Drill Kit Item Number": drillKitItemNumber,
      "Link to Drill Kit": linkToDrillKit,
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

    // Check if the name is not null and not "No Drill Sequence" before adding to the array
    if (itemName !== null && itemName !== "No Drill Sequence") {
      convertedDrillsArray.push({ itemName, link, itemNumber, quantity });
    }
  }

  // Format the final response with labeled information
  return [
    {
      label: OUTPUT_LABELS.IMPLANT_DRILL_KIT,
      info: [
        {
          itemName: implantDrillKitName,
          itemNumber: drillKitItemNumber,
          link: linkToDrillKit,
          quantity: !!linkToDrillKit ? 1 : null,
        },
      ],
    },
    {
      label: OUTPUT_LABELS.DRILL_SEQUENCE,
      info: convertedDrillsArray,
    },
  ];
};

/**
 * Formats the quiz response containing information about bone reduction kits.
 * @param {Object} quizResponse - The quiz response object.
 * @returns {Array} - Formatted quiz response with labeled information or [] if the input is invalid.
 */
const formatBoneReduction = (quizResponse = null) => {
  // Check if the quizResponse is valid
  if (!validateQuizResponse(quizResponse)) {
    return [];
  }

  // Destructure relevant information from the quizResponse
  const {
    _doc: {
      "Bur Kit Name (Bone Reduction)": burKitName = "",
      "Bur Kit Product Code": burKitItemNumber = "",
      "Bur Kit Link to Purchase": linkToBurKit = "",
      "Surgical Bur Kit (Denture Conversion)": surgicalBurKit = "",
    },
  } = quizResponse;

  // Extract individual details from the surgicalBurKit
  const [itemName = "", link = ""] = surgicalBurKit.split("\n");

  // Format and return the bone reduction information
  return [
    {
      label: OUTPUT_LABELS.BUR_KIT,
      info: [
        {
          itemName: burKitName,
          itemNumber: burKitItemNumber,
          link: linkToBurKit,
          quantity: !!linkToBurKit ? 1 : null,
        },
      ],
    },
    {
      label: OUTPUT_LABELS.SURGICAL_BUR_KIT,
      info: [
        {
          itemName,
          itemNumber: null,
          link,
          quantity: !!link ? 1 : null,
        },
      ],
    },
  ];
};

/**
 * Formats the quiz response containing information about the master implant driver.
 * @param {Object} quizResponse - The quiz response object.
 * @returns {Array} - Formatted quiz response with labeled information or [] if the input is invalid.
 */
const formatMasterImplantDriver = (quizResponse = null) => {
  // Check if the quizResponse is valid
  if (!validateQuizResponse(quizResponse)) {
    return [];
  }

  const {
    _doc: {
      "Driver Name": itemName = "",
      "Item Number": itemNumber = null,
      "Link to Purchase": link = null,
    },
  } = quizResponse;

  // Format the final response with labeled information
  return [
    {
      label: OUTPUT_LABELS.IMPLANT_DRIVER,
      info: [
        {
          itemName,
          itemNumber,
          link,
          quantity: !!link ? 1 : null,
        },
      ],
    },
  ];
};

/**
 * Formats the quiz response containing information about chair-side pick-up items.
 * @param {Object} quizResponse - The quiz response object.
 * @returns {Array} - Formatted quiz response with labeled information or [] if the input is invalid.
 */
const formatChairSidePickUp = (quizResponse = null) => {
  // Check if the quizResponse is valid
  if (!validateQuizResponse(quizResponse)) {
    return [];
  }

  const {
    _doc: {
      "Luting Agent Name": lutingAgentName = "",
      "Luting Agent Link to Purchase": lutingAgentLink = null,
      "Teflon Tape": teflonTape = "",
      "Teflon Tape Link to Purchase": teflonTapeLink = null,
      "Material to close screw access hole Name": materialName = "",
      "Material to close screw access hole link to purchase":
        materialLink = null,
    },
  } = quizResponse;

  // Format the final response with labeled information
  return [
    {
      label: OUTPUT_LABELS.LUTING_AGENT,
      info: [
        {
          itemName: lutingAgentName,
          itemNumber: null,
          link: lutingAgentLink,
          quantity: !!lutingAgentLink ? 1 : null,
        },
      ],
    },
    {
      label: OUTPUT_LABELS.TEFLON_TAPE,
      info: [
        {
          itemName: teflonTape,
          itemNumber: null,
          link: teflonTapeLink,
          quantity: !!teflonTapeLink ? 1 : null,
        },
      ],
    },
    {
      label: OUTPUT_LABELS.MATERIAL_CLOSE_ACCESS_HOLE,
      info: [
        {
          itemName: materialName,
          itemNumber: null,
          link: materialLink,
          quantity: !!materialLink ? 1 : null,
        },
      ],
    },
  ];
};

/**
 * Formats the quiz response containing information about implant purchase.
 * @param {Object} quizResponse - The quiz response object.
 * @returns {Array} - Formatted quiz response with labeled information or [] if the input is invalid.
 */
const formatImplantPurchase = (quizResponse = null) => {
  // Check if the quizResponse is valid
  if (!validateQuizResponse(quizResponse)) {
    return [];
  }

  const {
    _doc: {
      "Implant Name": implantName = "",
      "Link to purchase": link = null,
      "Article Number": itemNumber = "",
    },
  } = quizResponse;

  // Constants for labels to ensure consistency
  const LABEL_IMPLANT = "Implant";

  // Format the final response with labeled information
  return [
    {
      label: LABEL_IMPLANT,
      info: [
        {
          itemName: implantName,
          itemNumber,
          link,
          quantity: !!link ? 1 : null,
        },
      ],
    },
  ];
};

module.exports = {
  validateQuizResponse,
  formatDrillkitAndSequence,
  formatBoneReduction,
  formatMasterImplantDriver,
  formatChairSidePickUp,
  formatImplantPurchase,
};
