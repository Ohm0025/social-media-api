const multer = require("multer");
const dirname = __dirname;
const path = dirname.replace("middleware", "public/images");

//configure multer storage and fill name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() +
        "" +
        Math.round(Math.random() * 10000000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

//create multer upload instance
const upload = multer({ storage: storage });

//custom file upload middleware
const uploadMiddleware = (req, res, next) => {
  //use multer upload instance
  upload.fields([
    {
      name: "profile_picture",
    },
    {
      name: "profile_cover",
    },
    {
      name: "post_picture",
    },
    {
      name: "postText",
    },
    {
      name: "postType",
    },
  ])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    //retrive uploaded files
    const files = req.files;

    //proceed to the next middleware or route handler
    next();
  });
};

module.exports = uploadMiddleware;
