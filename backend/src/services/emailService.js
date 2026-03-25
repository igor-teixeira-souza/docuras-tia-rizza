const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOrderConfirmation = async (order) => {
  const { customerName, phone, address, total, _id, products } = order;

  const itemsHtml = products
    .map(
      (item) => `
    <tr>
      <td style="padding:8px; border-bottom:1px solid #ddd">${item.productId?.name || "Produto"}<\/td>
      <td style="padding:8px; border-bottom:1px solid #ddd">${item.quantity}<\/td>
      <td style="padding:8px; border-bottom:1px solid #ddd">R$ ${item.price.toFixed(2)}<\/td>
      <td style="padding:8px; border-bottom:1px solid #ddd">R$ ${(item.quantity * item.price).toFixed(2)}<\/td>
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
      <h3>📋 Itens:</h3>
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="background:#f2f2f2;">
            <th style="padding:8px;">Produto</th>
            <th style="padding:8px;">Qtd</th>
            <th style="padding:8px;">Preço</th>
            <th style="padding:8px;">Subtotal</th>
           </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <p>🔗 Acesse o painel administrativo para mais detalhes.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ E-mail enviado para ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    throw error;
  }
};
