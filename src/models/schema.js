export const calculatorSchema = new Schema(
  {
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
  },
  { strict: false }
);
