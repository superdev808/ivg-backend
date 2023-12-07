const mongoose = require("mongoose");

const crownMaterialSchema = mongoose.Schema({
  "Fixed / Removable": { type: String },
  "Restoration Type": { type: String },
  "Maxilla / Mandible": { type: String },
  "Tooth Category": { type: String },
  "Are aesthetics a top priority?": { type: String },
  "Does the preparation have retention and resistance form?": { type: String },
  "Are neighboring teeth translucent?": { type: String },
  "Does the patient have a high occlusal load?": { type: String },
  "Does this site have limited occlusal clearance?": { type: String },
  "Is the stump shade light or dark?": { type: String },
  "TOP SUGGESTED MATERIAL": { type: String },
  "SECONDARY OPTION": { type: String },
  "THIRD OPTION": { type: String },
  "NOTES": { type: String },
  "SUPPORTING ARTICLES": { type: String }
});

const CrownMaterialModel = mongoose.model('CrownMaterial', crownMaterialSchema, "CrownMaterials");

module.exports = CrownMaterialModel;