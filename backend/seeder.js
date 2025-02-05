const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Models
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Settings = require('./models/Settings');

dotenv.config();

// Test verileri
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Test User',
    email: 'test@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
];

const categories = [
  {
    name: 'Kolye',
    description: 'Şık ve zarif kolyeler',
    slug: 'kolye'
  },
  {
    name: 'Küpe',
    description: 'Modern küpe tasarımları',
    slug: 'kupe'
  },
  {
    name: 'Bileklik',
    description: 'El yapımı bileklikler',
    slug: 'bileklik'
  }
];

const products = [
  {
    name: 'Altın Kaplama Kolye',
    description: 'Özel tasarım altın kaplama kolye',
    price: 149.99,
    images: [
      'https://picsum.photos/400/400?random=1'
    ],
    category: null, // Kategori ID'si sonra eklenecek
    featured: true,
    inStock: true
  },
  {
    name: 'Gümüş Küpe',
    description: 'El işçiliği gümüş küpe',
    price: 89.99,
    images: [
      'https://picsum.photos/400/400?random=2'
    ],
    category: null,
    featured: true,
    inStock: true
  },
  {
    name: 'İnci Bileklik',
    description: 'Doğal inci bileklik',
    price: 129.99,
    images: [
      'https://picsum.photos/400/400?random=3'
    ],
    category: null,
    featured: false,
    inStock: true
  }
];

const settings = {
  siteName: 'Edadan Aksesuar',
  siteDescription: 'Şık ve Zarif Tasarımlar',
  contact: {
    address: 'İstanbul, Türkiye',
    phone: '+90 555 123 4567',
    email: 'info@edadanaksesuar.com',
    whatsapp: '+90 555 123 4567',
    instagram: '@edadanaksesuar'
  },
  pages: {
    aboutUs: 'Edadan Aksesuar olarak sizlere en şık ve zarif tasarımları sunuyoruz.',
    privacyPolicy: 'Gizlilik Politikası içeriği buraya gelecek.',
    termsOfService: 'Kullanım Koşulları içeriği buraya gelecek.'
  }
};

// Veritabanına bağlan
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err);
    process.exit(1);
  });

// Verileri içe aktar
const importData = async () => {
  try {
    // Mevcut verileri temizle
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Settings.deleteMany();

    // Kullanıcıları ekle
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Kategorileri ekle
    const createdCategories = await Category.insertMany(categories);

    // Ürünlere kategori ve admin ID'sini ekle
    const productsWithCategories = products.map((product, index) => ({
      ...product,
      category: createdCategories[index % createdCategories.length]._id,
      createdBy: adminUser
    }));

    // Ürünleri ekle
    await Product.insertMany(productsWithCategories);

    // Ayarları ekle
    await Settings.create(settings);

    console.log('Veriler başarıyla içe aktarıldı');
    process.exit();
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
};

// Verileri temizle
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Settings.deleteMany();

    console.log('Veriler başarıyla silindi');
    process.exit();
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
};

// Script parametresine göre işlem yap
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 