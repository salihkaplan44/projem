const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Settings = require('../models/Settings');
const { uploadToCloudinary } = require('../utils/cloudinaryUpload');

// @desc    Dashboard istatistiklerini getir
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ isAdmin: false });
    
    // Son 7 günün siparişleri
    const lastWeekOrders = await Order.find({
      createdAt: { 
        $gte: new Date(new Date().setDate(new Date().getDate() - 7))
      }
    }).sort('-createdAt');

    // Okunmamış mesajları olan siparişler
    const unreadMessages = await Order.find({
      'messages': { 
        $elemMatch: { 
          isRead: false,
          isAdmin: false 
        }
      }
    });

    res.json({
      stats: {
        totalOrders,
        totalProducts,
        totalUsers,
        unreadMessages: unreadMessages.length
      },
      recentOrders: lastWeekOrders
    });
  } catch (error) {
    res.status(500).json({ message: 'İstatistikler yüklenirken bir hata oluştu' });
  }
};

// @desc    Tüm kullanıcıları getir
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort('-createdAt');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcılar yüklenirken bir hata oluştu' });
  }
};

// @desc    Tüm siparişleri getir
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('messages')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Siparişler yüklenirken bir hata oluştu' });
  }
};

// @desc    Site ayarlarını getir
// @route   GET /api/admin/settings
// @access  Private/Admin
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Ayarlar yüklenirken bir hata oluştu' });
  }
};

// @desc    Site ayarlarını güncelle
// @route   PUT /api/admin/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
  try {
    const {
      siteName,
      siteDescription,
      contact,
      pages
    } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    // Logo yüklendiyse güncelle
    if (req.file) {
      const logoUrl = await uploadToCloudinary(req.file.path);
      settings.logo = logoUrl;
    }

    settings.siteName = siteName || settings.siteName;
    settings.siteDescription = siteDescription || settings.siteDescription;
    settings.contact = contact || settings.contact;
    settings.pages = pages || settings.pages;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Ayarlar güncellenirken bir hata oluştu' });
  }
};

// @desc    Kullanıcı yetkisini güncelle
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { isAdmin } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    user.isAdmin = isAdmin;
    await user.save();

    res.json({ message: 'Kullanıcı yetkisi güncellendi' });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı yetkisi güncellenirken bir hata oluştu' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  getSettings,
  updateSettings,
  updateUserRole
}; 