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

module.exports = {
  OUTPUT_TYPES,
  OUTPUT_LABELS,
  LABEL_MAPPINGS,
};
