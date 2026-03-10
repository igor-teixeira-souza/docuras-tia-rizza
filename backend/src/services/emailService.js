const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOrderNotification = async (order) => {

  const items = order.products
    .map(p => `${p.quantity}x produto`)
    .join("\n");

  const message = `
Novo pedido recebido!

Cliente: ${order.customerName}
Telefone: ${order.phone}

Itens:
${items}

Total: R$${order.total}
`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "seuemail@gmail.com",
    subject: "Novo pedido - Docuras Tia Rizza",
    text: message
  });

};