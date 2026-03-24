const nodemailer = require("nodemailer");

// Configuração do transporter com OAuth2
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    // O accessToken será obtido automaticamente pelo Nodemailer usando o refreshToken
  },
});

/**
 * Envia e-mail de confirmação de pedido para o administrador
 */
exports.sendOrderConfirmation = async (order) => {
  const { customerName, phone, address, total, _id, products } = order;

  const itemsHtml = products
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.productId?.name || "Produto"}<\/td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}<\/td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">R$ ${item.price.toFixed(2)}<\/td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">R$ ${(item.quantity * item.price).toFixed(2)}<\/td>
    <\/tr>
  `,
    )
    .join("");

  const mailOptions = {
    from: `"Doçuras da Tia Rizza" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `📦 Novo pedido #${_id} recebido!`,
    html: `
      <h2>🛒 Novo pedido realizado!</h2>
      <p><strong>Cliente:</strong> ${customerName}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Endereço:</strong> ${address || "Não informado"}</p>
      <p><strong>Total:</strong> <strong>R$ ${total.toFixed(2)}</strong></p>
      <h3>📋 Itens do pedido:</h3>
      <table style="width:100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px;">Produto</th>
            <th style="padding: 8px;">Quantidade</th>
            <th style="padding: 8px;">Preço unitário</th>
            <th style="padding: 8px;">Subtotal</th>
          <\/tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      <\/table>
      <p>🔗 Acesse o painel administrativo para mais detalhes.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ E-mail enviado para ${process.env.ADMIN_EMAIL}`);
    return info;
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    throw error; // Se quiser que o erro seja tratado no controller
  }
};
