import multer from "multer";
import path from "path";

const storage = multer.memoryStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${extension}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

export default upload.single("image");
