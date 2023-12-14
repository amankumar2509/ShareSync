const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuidv4 } = require("uuid");

router.get('/', (req, res) => {
  // Render the index page
  res.render('index');
});

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/') ,


//   filename: (req, file, cb) => {
//       const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
//             cb(null, uniqueName)
//   } ,
// });

// let upload = multer({
//   storage,
//   limits: { fileSize: 1000000 * 100 }, 
// }).single("myfile");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    
    // Ensure the directory exists
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 }, 
}).single("myfile");


router.post('/', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
      const file = new File({
          filename: req.file.filename,
          uuid: uuidv4(),
          path: req.file.path,
          size: req.file.size
      });
      const response = await file.save();
      res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
    });
});

module.exports = router;
