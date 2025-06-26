const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const storage = multer.memoryStorage(); // in-memory for sharp processing
const upload = multer({
  storage,
  limits: { files: 5 },
  fileFilter: (req, file, cb) => {
    const type = file.mimetype;
    if (type === 'image/jpeg' || type === 'image/png') cb(null, true);
    else cb(new Error('Only JPEG or PNG allowed'), false);
  }
});
const resizeAndSaveImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length < 3) {
      return res.status(400).json({ message: 'Minimum 3 images required' });
    }

    const imageNames = [];

    for (let i = 0; i < req.files.length; i++) {
      const filename = `product-${Date.now()}-${i}.jpeg`;
      const filepath = path.join(__dirname, '../public/products', filename);

      await sharp(req.files[i].buffer)
        .resize(600, 600)
        .jpeg({ quality: 90 })
        .toFile(filepath);

      imageNames.push(filename);
    }

    req.body.images = imageNames; // pass to controller
    next();
  } catch (err) {
    res.status(500).json({ message: 'Image processing failed', error: err.message });
  }
};

module.exports = { upload, resizeAndSaveImages };