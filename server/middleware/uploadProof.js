
const multer = require('multer');


const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
   

        cb(null, '../client/public/img/proof_of_delivery');
      
    },
    filename: function (req, file, cb) {
      

        cb(null, file.originalname)
     
    },
  
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;