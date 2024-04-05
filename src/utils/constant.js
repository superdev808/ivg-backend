const OUTPUT_TYPES = {
  DRILL_KIT_AND_SEQUENCE: "DrillKitAndSequence",
  BONE_REDUCTION: "BoneReduction",
  MASTER_IMPLANT_DRIVER: "RestorativeDirectToImplant",
  CHAIR_SIDE_PICK_UP: "ChairSidePickUp",
  IMPLANT_PURCHASE: "Implants",
  SCANBODIES: "Scanbodies",
  SCANBODYMUAS: "ScanbodyMUAs",
};

const OUTPUT_LABELS = {
  IMPLANT_DRILL_KIT: "Implant Drill Kit Name",
  DRILL_SEQUENCE: "Drill Sequence",
  BUR_KIT: "Bur Kit Name (Bone Reduction)",
  SURGICAL_BUR_KIT: "Bur Kit (Denture Conversion) Name",
  IMPLANT_DRIVER: "Master Implant Driver ",
  LUTING_AGENT: "Luting Agent",
  TEFLON_TAPE: "Teflon Tape",
  MATERIAL_CLOSE_ACCESS_HOLE: "Material to Close Screw Access Hole",
  IMPLANT: "Implant",
  SCANBODIES: "Master Scanbody",
};

const LABEL_MAPPINGS = {
  DrillKitAndSequence: "Drill Kits and Drill Sequences",
  BoneReduction: "Bone Reduction Instruments",
  RestorativeDirectToImplant: "Drivers (Restorative, Direct to Implant)",
  ChairSidePickUp: "Chairside Pick-Up Materials",
  Implants: "Implants",
  Scanbodies: "Scanbodies (Single Unit)",
  ScanbodyDriversDirectToImplants: "Scanbody Drivers (Direct to Implant)",
  ImpressingCopingsDirectToImplants: "Impression Copings (Direct to Implant)",
  TemporaryCopingsDirectToImplants: "Temporary Copings (Direct to Implant)",
  TiBasesDirectToImplants: "Ti Bases (Direct to Implant)",
  ScanbodyMUAs: "Scanbodies (Mult-Unit Abutments)",
  ScanbodyDriversMUAs: "Scanbody Drivers (MUAs)",
  ImpressingCopingsMUAs: "Impression Copings (Multi-Unit Abutments)",
  TemporaryCopingsMUAs: "Temporary Copings (Multi-Unit Abutments)",
  TiBasesMUAs: "Ti Bases (Multi-Unit Abutments)",
  MUAs: "Multi-Unit Abutments",
  RestorativeMultiUnitAbutments:
    "Drivers (Restorative, on Multi-Unit Abutments)",
  ImplantAnalogs: "Implant Analogs",
  ImplantScrews: "Implant Screws",
  HealingAbutments: "Healing Abutments",
  StockAbutments: "Stock Abutments",
};

const CALCULATORS = [
  // {
  //   type: "Implant Drivers",
  //   label: "implant driver",
  //   placeholder: "Select Manufacturer",
  //   description:
  //     "This calculator will provide the correct implant driver for you to use based on the implant (manufacturer, system, size) that was placed.",
  //   value: 1,
  // },
  // {
  //   type: "Implant Screws",
  //   label: "implant screw",
  //   placeholder: "Select Implant Manufacturer",
  //   description:
  //     "This calculator will provide you with the correct implant screw to use based on the implant (manufacturer, system, size) that was placed.",
  //   value: 2,
  // },
  {
    type: "crownMaterials",
    label: "Crown Materials",
    description:
      "Enter your patient's information below to determine suggested materials for the restoration.",
    disabled: true,
  },
  {
    type: "ChairSidePickUp",
    label: "Chairside Pick-Up Materials",
    description:
      "This calculator provides recommended materials to perform chairside pick-ups on the day of surgery.",
  },
  {
    type: "DrillKitAndSequence",
    label: "Drill Kits and Drill Sequences",
    description:
      "This calculator displays surgical drill kits, drills, and drill sequences based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "BoneReduction",
    label: "Bone Reduction Instruments",
    description:
      "This calculator provides recommended instruments to perform bone reduction and denture conversions.",
  },
  {
    type: "RestorativeDirectToImplant",
    label: "Drivers (Restorative, Direct to Implant)",
    description:
      "This calculator displays restorative drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "RestorativeMultiUnitAbutments",
    label: "Drivers (Restorative, on Multi-Unit Abutments)",
    description:
      "This calculator displays restorative drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "HealingAbutments",
    label: "Healing Abutments",
    description:
      "This calculator displays healing abutments based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "Implants",
    label: "Implants",
    description:
      "This calculator displays implants based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "ImplantScrews",
    label: "Implant Screws",
    description:
      "This calculator displays screws based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "ImplantTorquesGuide",
    label: "Implant Torque Guide",
    description: "Find the right torque value for your desired component, product, or procedure.",
  },
  {
    type: "ImplantAnalogs",
    label: "Implant Analogs",
    description:
      "This calculator displays implant analogs for stone (lab) and digital (IOS) models based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "ImpressingCopingsDirectToImplants",
    label: "Impression Copings (Direct to Implant)",
    description:
      "This calculator displays impression copings for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "ImpressingCopingsMUAs",
    label: "Impression Copings (Multi-Unit Abutments)",
    description:
      "This calculator displays impression copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "MUAs",
    label: "Multi-Unit Abutments",
    description:
      "This calculator displays multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "Scanbodies",
    label: "Scanbodies (Single Unit)",
    description:
      "This calculator displays scanbodies for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "ScanbodyMUAs",
    label: "Scanbodies (Multi-Unit Abutments)",
    description:
      "This calculator displays scanbodies for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "ScanbodyDriversDirectToImplants",
    label: "Scanbody Drivers (Direct to Implant)",
    description:
      "This calculator displays scanbody drivers for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "ScanbodyDriversMUAs",
    label: "Scanbody Drivers (MUAs)",
    description:
      "This calculator displays scanbody drivers for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "StockAbutments",
    label: "Stock Abutments",
    description:
      "This calculator displays stock abutments based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "TemporaryCopingsDirectToImplants",
    label: "Temporary Copings (Direct to Implant)",
    description:
      "This calculator displays stock abutments based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "TemporaryCopingsMUAs",
    label: "Temporary Copings (Multi-Unit Abutments)",
    description:
      "This calculator displays temporary copings for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "TiBasesDirectToImplants",
    label: "Ti Bases (Direct to Implant)",
    description:
      "This calculator displays Ti Bases for single implants based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "TiBasesMUAs",
    label: "Ti Bases (Multi-Unit Abutments)",
    description:
      "This calculator displays Ti Bases for multi-unit abutments based on desired implant brand and size, as well as links to purchase this equipment.",
  },
  {
    type: "ToothBorneBridge",
    label: "Tooth-Borne Bridge",
    description: "",
  },
  {
    type: "ToothBorneCrown",
    label: "Tooth-Borne Crown",
    description: "",
  },
  {
    type: "ImplantBorneBridge",
    label: "Implant-Borne Bridge",
    description: "",
  },
  {
    type: "ImplantBorneCrown",
    label: "Implant-Borne Crown",
    description: "",
  },
];

module.exports = {
  OUTPUT_TYPES,
  OUTPUT_LABELS,
  LABEL_MAPPINGS,
  CALCULATORS,
};
