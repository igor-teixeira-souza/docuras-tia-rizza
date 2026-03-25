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

  // Log para depuração - veja no console do backend o que está chegando
  console.log("📧 Dados do pedido:", {
    customerName,
    phone,
    address: address || "(vazio)",
    total,
    _id,
    productsCount: products?.length,
  });

  // Tratamento do endereço
  const endereco = address && address.trim() !== "" ? address : "Não informado";

  const itemsHtml = products
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 12px 8px;">${item.productId?.name || "Produto"}<\/td>
        <td style="padding: 12px 8px; text-align: center;">${item.quantity}<\/td>
        <td style="padding: 12px 8px; text-align: right;">R$ ${item.price.toFixed(2)}<\/td>
        <td style="padding: 12px 8px; text-align: right; font-weight: 500;">R$ ${(item.quantity * item.price).toFixed(2)}<\/td>
      <\/tr>
    `,
    )
    .join("");

  const mailOptions = {
    from: `"Doçuras da Tia Rizza" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🍰 Novo pedido #${_id} recebido!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Novo Pedido</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', 'Poppins', Arial, sans-serif; background-color: #FFF5F5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header com gradiente -->
          <div style="background: linear-gradient(135deg, #FFE4E1 0%, #FFDDEE 100%); padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: #2D2D2D;">🍰 Doçuras da Tia Rizza</h1>
            <p style="margin: 8px 0 0; font-size: 14px; color: #5D5D5D;">Novo pedido recebido!</p>
          </div>
          
          <!-- Conteúdo principal -->
          <div style="padding: 24px;">
            <h2 style="margin: 0 0 8px; font-size: 24px; color: #2D2D2D;">Pedido #${_id}</h2>
            <p style="margin: 0 0 24px; color: #888; font-size: 14px;">Realizado em ${new Date().toLocaleString("pt-BR")}</p>
            
            <!-- Dados do cliente -->
            <div style="background-color: #FEF5F5; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
              <h3 style="margin: 0 0 12px; font-size: 16px; color: #FF6B6B;">📋 Dados do Cliente</h3>
              <p style="margin: 8px 0;"><strong>👤 Nome:</strong> ${customerName}</p>
              <p style="margin: 8px 0;"><strong>📞 Telefone:</strong> ${phone}</p>
              <p style="margin: 8px 0;"><strong>📍 Endereço:</strong> ${endereco}</p>
            </div>
            
            <!-- Tabela de itens -->
            <h3 style="margin: 0 0 16px; font-size: 16px; color: #FF6B6B;">🍽️ Itens do Pedido</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <thead>
                <tr style="background-color: #F9E9E9;">
                  <th style="padding: 12px 8px; text-align: left; font-weight: 600;">Produto</th>
                  <th style="padding: 12px 8px; text-align: center; font-weight: 600;">Qtd</th>
                  <th style="padding: 12px 8px; text-align: right; font-weight: 600;">Preço</th>
                  <th style="padding: 12px 8px; text-align: right; font-weight: 600;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr style="background-color: #FFF5F5;">
                  <td colspan="3" style="padding: 12px 8px; text-align: right; font-weight: bold;">Total do pedido:</td>
                  <td style="padding: 12px 8px; text-align: right; font-weight: bold; font-size: 18px; color: #FF6B6B;">R$ ${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            
            <!-- Mensagem de ação -->
            <div style="background-color: #F9F9F9; border-radius: 12px; padding: 16px; text-align: center;">
              <p style="margin: 0 0 12px; font-size: 14px; color: #666;">
                🔗 Para mais detalhes, acesse o <strong style="color: #FF6B6B;">Painel Administrativo</strong>.
              </p>
              <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/admin/orders" 
                 style="display: inline-block; background-color: #FF6B6B; color: white; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-weight: 500;">
                Ver pedido no painel
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #F5F5F5; padding: 20px; text-align: center; border-top: 1px solid #E0E0E0;">
            <p style="margin: 0 0 8px; font-size: 12px; color: #999;">
              Doçuras da Tia Rizza - Doces artesanais com amor 🍰
            </p>
            <p style="margin: 0; font-size: 12px; color: #999;">
              Este e-mail foi enviado automaticamente. Por favor, não responda.
            </p>
          </div>
        </div>
      </body>
      </html>
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
