const Product = require('../models/Product');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryUpload');

// @desc    Tüm ürünleri getir
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, search, sort, featured } = req.query;
    let query = {};

    // Kategori filtresi
    if (category) {
      query.category = category;
    }

    // Arama filtresi
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Öne çıkan ürünler filtresi
    if (featured === 'true') {
      query.featured = true;
    }

    // Sıralama seçenekleri
    let sortOption = {};
    if (sort === 'price-asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price-desc') {
      sortOption = { price: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    }

    const products = await Product.find(query)
      .sort(sortOption)
      .populate('category', 'name');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Ürünler yüklenirken bir hata oluştu' });
  }
};

// @desc    Tek bir ürün getir
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Ürün yüklenirken bir hata oluştu' });
  }
};

// @desc    Yeni ürün ekle
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, featured } = req.body;
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: 'En az bir ürün görseli gerekli' });
    }

    // Görselleri Cloudinary'ye yükle
    const imageUrls = await Promise.all(
      images.map(file => uploadToCloudinary(file.path))
    );

    const product = await Product.create({
      name,
      description,
      price,
      category,
      featured: featured || false,
      images: imageUrls,
      createdBy: req.user._id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Ürün eklenirken bir hata oluştu' });
  }
};

// @desc    Ürün güncelle
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, featured, inStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }

    // Yeni görseller varsa yükle
    if (req.files && req.files.length > 0) {
      // Eski görselleri sil
      await Promise.all(
        product.images.map(image => deleteFromCloudinary(image))
      );

      // Yeni görselleri yükle
      const imageUrls = await Promise.all(
        req.files.map(file => uploadToCloudinary(file.path))
      );
      product.images = imageUrls;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.featured = featured !== undefined ? featured : product.featured;
    product.inStock = inStock !== undefined ? inStock : product.inStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Ürün güncellenirken bir hata oluştu' });
  }
};

// @desc    Ürün sil
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }

    // Görselleri Cloudinary'den sil
    await Promise.all(
      product.images.map(image => deleteFromCloudinary(image))
    );

    await product.remove();
    res.json({ message: 'Ürün başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Ürün silinirken bir hata oluştu' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}; 