import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        const nombreUnico =
            Date.now() + path.extname(file.originalname);

        cb(null, nombreUnico);
    }
});

const upload = multer({ storage });
export default upload;
