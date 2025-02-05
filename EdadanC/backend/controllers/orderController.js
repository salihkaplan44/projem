const Order = require('../models/Order');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');
const { getOrderConfirmationTemplate } = require('../utils/emailTemplates');

// @desc    Yeni sipariş oluştur
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Sipariş öğeleri gerekli' });
    }

    // Ürünleri kontrol et ve toplam tutarı hesapla
    let totalAmount = 0;
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Ürün bulunamadı: ${item.productId}`);
        }
        if (!product.inStock) {
          throw new Error(`Ürün stokta yok: ${product.name}`);
        }
        totalAmount += product.price * item.quantity;
        return {
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.images[0]
        };
      })
    );

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalAmount
    });

    // Sipariş onay e-postası gönder
    await sendEmail({
      email: shippingAddress.email,
      subject: 'Siparişiniz Alındı',
      html: getOrderConfirmationTemplate(order)
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Kullanıcının siparişlerini getir
// @route   GET /api/orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort('-createdAt')
      .populate('messages');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Siparişler yüklenirken bir hata oluştu' });
  }
};

// @desc    Sipariş detayını getir
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('messages');

    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' });
    }

    // Kullanıcı kontrolü
    if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Sipariş yüklenirken bir hata oluştu' });
  }
};

// @desc    Sipariş durumunu güncelle (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Sipariş güncellenirken bir hata oluştu' });
  }
};

// @desc    Siparişe mesaj ekle
// @route   POST /api/orders/:id/messages
// @access  Private
const addOrderMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' });
    }

    // Kullanıcı kontrolü
    if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const newMessage = await Message.create({
      order: order._id,
      sender: req.user._id,
      message,
      isAdmin: req.user.isAdmin
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Mesaj eklenirken bir hata oluştu' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  addOrderMessage
}; 