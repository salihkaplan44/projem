const getPasswordResetTemplate = (resetUrl) => {
  return `
    <h1>Şifre Sıfırlama İsteği</h1>
    <p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
    <a href="${resetUrl}" style="
      display: inline-block;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    ">Şifremi Sıfırla</a>
    <p>Bu bağlantı 10 dakika süreyle geçerlidir.</p>
    <p>Eğer şifre sıfırlama isteğinde bulunmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
  `;
};

const getOrderConfirmationTemplate = (order) => {
  return `
    <h1>Siparişiniz Alındı</h1>
    <p>Sayın ${order.shippingAddress.fullName},</p>
    <p>Siparişiniz başarıyla alındı. Sipariş detayları aşağıdadır:</p>
    <div style="margin: 20px 0;">
      <h3>Sipariş No: #${order._id}</h3>
      <h3>Toplam Tutar: ${order.totalAmount} ₺</h3>
    </div>
    <h3>Sipariş Edilen Ürünler:</h3>
    <ul>
      ${order.items.map(item => `
        <li>${item.name} - ${item.quantity} adet - ${item.price} ₺</li>
      `).join('')}
    </ul>
    <h3>Teslimat Adresi:</h3>
    <p>${order.shippingAddress.address}</p>
    <p>Siparişinizle ilgili güncellemeler için web sitemizi ziyaret edebilirsiniz.</p>
  `;
};

module.exports = {
  getPasswordResetTemplate,
  getOrderConfirmationTemplate
}; 