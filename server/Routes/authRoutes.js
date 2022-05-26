var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

const { register, login, uploads } = require("../Controllers/authController");
const router = require("express").Router();

router.post("/");
router.post("/register", register);
router.post("/login", login);
router.post("/upload", upload.single("fileName"), uploads);

module.exports = router;
