const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../../files/logos"));
  },
  filename: function (req, file, callback) {
    const logoNameWithExtension = file.originalname;

    const logoName = logoNameWithExtension.split(".").slice(0, -1).join(".");
    const extension = /(?:\.([^.]+))?$/.exec(logoNameWithExtension)[1];

    callback(null, `${logoName}-${Date.now()}.${extension}`);
  },
});

const fileFilter = (req, file, callback) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|svg/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  } else {
    callback("Error: Images Only!");
  }
};

module.exports = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter,
});
