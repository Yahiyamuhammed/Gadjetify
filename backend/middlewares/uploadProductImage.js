const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");


const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { files: 5 },
  fileFilter: (req, file, cb) => {
    const type = file.mimetype;
    if (type === "image/jpeg" || type === "image/png") cb(null, true);
    else cb(new Error("Only JPEG or PNG allowed"), false);
  },
});
const resizeAndSaveImages = async (req, res, next) => {
  const isEdit = req.method === "PUT";

  try {
    if (!isEdit && (!req.files || req.files.length < 3)) {
      return res.status(400).json({ message: "Minimum 3 images required" });
    }

    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "shopping_cart/products" }, // folder in Cloudinary
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    };

    const uploadedImages = [];
    for (let i = 0; i < req.files.length; i++) {
      const result = await uploadToCloudinary(req.files[i].buffer);
      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    req.body.images = uploadedImages; // store URLs + public_ids in DB
    next();
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Image upload failed", error: err.message });
  }
};

module.exports = { upload, resizeAndSaveImages };
