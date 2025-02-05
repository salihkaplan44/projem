const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

// Profil güncelleme
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const { name, email, phone, address } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin
    });
  } catch (error) {
    res.status(500).json({ message: 'Profil güncellenirken bir hata oluştu' });
  }
});

// Favori ürünler
router.post('/favorites/:productId', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params.productId;

    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }

    res.json({ message: 'Ürün favorilere eklendi' });
  } catch (error) {
    res.status(500).json({ message: 'Favorilere eklenirken bir hata oluştu' });
  }
});

router.delete('/favorites/:productId', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params.productId;

    user.favorites = user.favorites.filter(id => id.toString() !== productId);
    await user.save();

    res.json({ message: 'Ürün favorilerden kaldırıldı' });
  } catch (error) {
    res.status(500).json({ message: 'Favorilerden kaldırılırken bir hata oluştu' });
  }
});

module.exports = router; 