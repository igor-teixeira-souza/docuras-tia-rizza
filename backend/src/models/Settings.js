const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "Doçuras da Tia Rizza" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    hoursWeek: { type: String, default: "8h às 19h" },
    hoursSat: { type: String, default: "9h às 17h" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    heroImage: { type: String, default: "" },
  },
  { timestamps: true },
);

// Como queremos apenas um documento de configurações, podemos usar um singleton
// Vamos criar um método estático para obter ou criar o documento padrão
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model("Settings", settingsSchema);
