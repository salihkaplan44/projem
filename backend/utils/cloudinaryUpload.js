const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'edadan-aksesuar',
      use_filename: true
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Görsel yüklenirken bir hata oluştu');
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Görsel silinirken bir hata oluştu');
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
}; 