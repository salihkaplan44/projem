const Category = require('../models/Category');
const Product = require('../models/Product');

// @desc    Tüm kategorileri getir
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('parent', 'name')
      .sort('name');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Kategoriler yüklenirken bir hata oluştu' });
  }
};

// @desc    Kategori detayını getir
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name');

    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı' });
    }

    // Kategorideki ürünleri getir
    const products = await Product.find({ category: category._id })
      .select('name price images')
      .sort('-createdAt');

    res.json({
      category,
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Kategori yüklenirken bir hata oluştu' });
  }
};

// @desc    Yeni kategori ekle
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name, description, parent } = req.body;

    // Kategori adı kontrolü
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Bu kategori adı zaten kullanılıyor' });
    }

    const category = await Category.create({
      name,
      description,
      parent: parent || null
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Kategori eklenirken bir hata oluştu' });
  }
};

// @desc    Kategori güncelle
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
  try {
    const { name, description, parent } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı' });
    }

    // Eğer isim değişiyorsa, yeni isim kontrolü yap
    if (name && name !== category.name) {
      const categoryExists = await Category.findOne({ name });
      if (categoryExists) {
        return res.status(400).json({ message: 'Bu kategori adı zaten kullanılıyor' });
      }
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.parent = parent || category.parent;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Kategori güncellenirken bir hata oluştu' });
  }
};

// @desc    Kategori sil
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı' });
    }

    // Kategoriye ait ürün kontrolü
    const hasProducts = await Product.exists({ category: category._id });
    if (hasProducts) {
      return res.status(400).json({ 
        message: 'Bu kategoride ürünler var. Önce ürünleri başka bir kategoriye taşıyın veya silin.'
      });
    }

    // Alt kategori kontrolü
    const hasSubcategories = await Category.exists({ parent: category._id });
    if (hasSubcategories) {
      return res.status(400).json({ 
        message: 'Bu kategorinin alt kategorileri var. Önce alt kategorileri silin.'
      });
    }

    await category.remove();
    res.json({ message: 'Kategori başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Kategori silinirken bir hata oluştu' });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}; 