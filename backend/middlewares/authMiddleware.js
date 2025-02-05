const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Token'ı header'dan al
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme başarısız. Token bulunamadı.' });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Kullanıcıyı bul
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Yetkilendirme başarısız. Kullanıcı bulunamadı.' });
    }

    // Kullanıcıyı request'e ekle
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Yetkilendirme başarısız. Geçersiz token.' });
  }
};

// Admin kontrolü
const adminMiddleware = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Bu işlem için admin yetkisi gerekiyor.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware }; 