const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const storage = multer.memoryStorage(); // in-memory for sharp processing
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
  console.log("this is inside upload", req.files.length );
 const isEdit = req.method === "PUT";

  try {
    
   if (!isEdit && (!req.files || req.files.length < 3)) {
      return res.status(400).json({ message: "Minimum 3 images required" });
    }

    const productDir = path.join(__dirname, "../public/products");
    if (!fs.existsSync(productDir))
      fs.mkdirSync(productDir, { recursive: true });

    const imageNames = [];

    for (let i = 0; i < req.files.length; i++) {
      const filename = `product-${Date.now()}-${i}.jpeg`;
      const filepath = path.join(productDir, filename);

      await fs.promises.writeFile(filepath, req.files[i].buffer);

      imageNames.push(filename);
    }

    req.body.images = imageNames;
    next();
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Image processing failed", error: err.message });
  }
};

module.exports = { upload, resizeAndSaveImages };
