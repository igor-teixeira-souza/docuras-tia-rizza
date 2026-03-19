const Settings = require("../models/Settings");

// GET /api/settings
exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings(); // garante que existe
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/settings
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
