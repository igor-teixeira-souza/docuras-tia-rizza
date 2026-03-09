module.exports = (req, res, next) => {

  const { name, price } = req.body

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Nome do produto é obrigatório"
    })
  }

  if (!price || price <= 0) {
    return res.status(400).json({
      message: "Preço deve ser maior que zero"
    })
  }

  next()

}