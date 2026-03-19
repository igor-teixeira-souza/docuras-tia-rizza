const Promotion = require("../models/Promotion");

// GET /api/promotions
exports.getAll = async (req, res) => {
  try {
    const promotions = await Promotion.find().sort("-createdAt");
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/promotions/:id
exports.getById = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion)
      return res.status(404).json({ error: "Promoção não encontrada" });
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/promotions
exports.create = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/promotions/:id
exports.update = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!promotion)
      return res.status(404).json({ error: "Promoção não encontrada" });
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/promotions/:id
exports.delete = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion)
      return res.status(404).json({ error: "Promoção não encontrada" });
    res.json({ message: "Promoção removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
