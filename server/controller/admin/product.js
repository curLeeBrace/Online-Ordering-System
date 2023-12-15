const ProductSchema = require("../../database/schema/ProductSchema");

const fs = require("fs");
const path = require("path");



const addProduct = async (req, res) => {
  //check all Element in array then return boolean
  const checkElement = (array, newElement) => {
    let canAdd_newElement = true;

      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if(element === newElement) {
           canAdd_newElement = false;
        }
        
      }

      return canAdd_newElement
      
  };

  
  // const { Flavor, Size, Price, ImageName } = req.body;
  // // console.log("req Size = ", Size);
  // // console.log("Image", ImageName)

  try {
    // return res.json({notif : "You Already had that Flavor", status : "ok"})
 
    const product = await ProductSchema.findOne({ Flavor: Flavor });

    

    //update either price or size or both if flavor is existing
    if (product != null) {
      // add new variation of Size if that size (client input), is not existing to database
      if(ImageName !== undefined){
    
        return res.json({notif : "You Already had that Flavor", status : "ok"});

      } else {
        if (checkElement(product.Size, Size)) {
          console.log("Size is Existing!")
      
          const result = await ProductSchema.updateOne(
            { Flavor: Flavor },
            { $push: { 
              Size: Size,
              Price : Price
            
            } }
          );
        return res.json({notif : "Succsesfully Added new Size and Price!", status : "ok"});
      
        }
  
      
        return res.json({notif : "Already Had that size!", status : "ok"});
      }
      
      
    } 

    else {
      if (ImageName == undefined) {
   
        return res.json({notif : "Please Add Image First!", status : "ok"});
      }
        
        const result = await ProductSchema.create({
          Flavor: Flavor,
          Size: [Size],
          Price: [Price],
          ImageName: ImageName,
        });
        console.log("Created", result)
        if(result) return res.json({notif : "Succsesfully Added! new Flavor", status : "ok"});
       
      
    }

   
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productID, imageName} = req.body;
    const deleted_item = await ProductSchema.findByIdAndDelete(productID);
    console.log(imageName)
    // console.log(deleted_item);
    
    const imagePath = `../client/public/img/products/milktea/${imageName}`; // replace with the actual path to your image

    // Check if the file exists before attempting to delete
    if (fs.existsSync(imagePath)) {
      // Delete the file
      fs.unlinkSync(imagePath);
      console.log("File deleted successfully.");
    } else {
      console.log("File not found.");
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const allProduct = await ProductSchema.find({});

    // console.log(allProduct);
    res.json(allProduct);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  deleteProduct,
};
