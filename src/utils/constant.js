const OUTPUT_TYPES = {
  DRILL_KIT_AND_SEQUENCE: "DrillKitAndSequence",
  BONE_REDUCTION: "BoneReduction",
  MASTER_IMPLANT_DRIVER: "RestroativeDirectToImplant",
  CHAIR_SIDE_PICK_UP: "ChairSidePickUp",
  IMPLANT_PURCHASE: "Implants",
  SCANBODIES: "Scanbodies",
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
  ScanbodyDriversDirectToImplants: "Scanbody Driver",
  ImpressingCopingsDirectToImplants: "Impression Copings",
  TemporaryCopingsDirectToImplants: "Temporary Copings",
  TiBasesDirectToImplants: "Ti Base",
  ScanbodyMUAs: "Master MUA Scanbody",
  ScanbodyDriversMUAs: "MUA Scanbody Driver",
  ImpressingCopingsMUAs: "MUA Impression Copings",
  TemporaryCopingsMUAs: "MUA Temporary Copings",
  TiBasesMUAs: "Ti Base (MUA)",
  MUAs: "MUA",
  RestorativeMultiUnitAbutments: "MUA Driver",
};

module.exports = {
  OUTPUT_TYPES,
  OUTPUT_LABELS,
  LABEL_MAPPINGS,
};
