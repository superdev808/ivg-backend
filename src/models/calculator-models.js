const BoneReductionModel = require("./bone-reduction-model");
const ChairSidePickUpModel = require("./chair-side-pickup-model");
const DrillKitAndSequenceModel = require("./drillkit_and_sequence_model");
const HealingAbutmentsModel = require("./healing-abutments-model");
const ImplantAnalogsModel = require("./implant-analog-model");
const ImplantsModel = require("./implant-model");
const ImplantScrewsModel = require("./implant-screw-model");
const ImplantTorquesModel = require("./implant-torque-model");
const ImpressingCopingsDirectToImplantsModel = require("./impressing-copings-direct-to-implant-model");
const ImpressingCopingsMUAsModel = require("./impressing-copings-mua-model");
const MUAsModel = require("./mua-model");
const RestorativeMultiUnitAbutmentsModel = require("./restorative-multi-unit-abutments-model");
const RestorativeDirectToImplantModel = require("./restorative-direct-to-implant-model");
const ScanbodyDriversDirectToImplantsModel = require("./scanbody-drivers-direct-to-implants-model");
const ScanbodyDriversMUAsModel = require("./scanbody-drivers-muas-model");
const ScanbodyModel = require("./scanbody-model");
const ScanbodyMUAsModel = require("./scanbody-mua-model");
const StockAbutmentsModel = require("./stock-abutments-model");
const TemporaryCopingsDirectToImplantsModel = require("./temporary-copings-direct-to-implants-model");
const TemporaryCopingsMUAsModel = require("./temporary-copings-muas-model");
const TiBasesDirectToImplantsModel = require("./ti-bases-direct-to-implant-model");
const TiBasesMUAsModel = require("./ti-bases-muas-model");

const CALCULATOR_MODELS = {
  BoneReduction: BoneReductionModel,
  ChairSidePickUp: ChairSidePickUpModel,
  DrillKitAndSequence: DrillKitAndSequenceModel,
  Scanbodies: ScanbodyModel,
  RestorativeDirectToImplant: RestorativeDirectToImplantModel,
  RestorativeMultiUnitAbutments: RestorativeMultiUnitAbutmentsModel,
  HealingAbutments: HealingAbutmentsModel,
  ImplantAnalogs: ImplantAnalogsModel,
  ImplantScrews: ImplantScrewsModel,
  ImplantTorquesGuide: ImplantTorquesModel,
  Implants: ImplantsModel,
  ImpressingCopingsDirectToImplants: ImpressingCopingsDirectToImplantsModel,
  ImpressingCopingsMUAs: ImpressingCopingsMUAsModel,
  MUAs: MUAsModel,
  ScanbodyMUAs: ScanbodyMUAsModel,
  ScanbodyDriversDirectToImplants: ScanbodyDriversDirectToImplantsModel,
  ScanbodyDriversMUAs: ScanbodyDriversMUAsModel,
  StockAbutments: StockAbutmentsModel,
  TemporaryCopingsDirectToImplants: TemporaryCopingsDirectToImplantsModel,
  TemporaryCopingsMUAs: TemporaryCopingsMUAsModel,
  TiBasesDirectToImplants: TiBasesDirectToImplantsModel,
  TiBasesMUAs: TiBasesMUAsModel,
};

module.exports = CALCULATOR_MODELS;
