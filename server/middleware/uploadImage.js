const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/src/img/products/milktea')
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;