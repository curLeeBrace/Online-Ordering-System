const ProductSchema = require("../../database/schema/ProductSchema");

let notif = "";

const addProduct = async (req, res) => {
  //check all Element in array then return boolean
  const checkElement = (array, newElement) => {
    let canAdd_newElement = true;
    try {
      array.map((element) => {
        if (element === newElement) {
          console.log(element, " ", newElement);
          canAdd_newElement = false;
        }
      });

      return canAdd_newElement;
    } catch (error) {
      return error;
    }
  };

  const { Flavor, Size, Price, ImageName } = req.body;
  console.log("req Size = ", Size);

  try {
    const product = await ProductSchema.findOne({ Flavor: Flavor });

    //update either price or size or both if flavor is existing
    if (product != null) {
      // add new variation of Size if that size (client input), is not existing to database
      if (checkElement(product.Size, Size)) {
        notif = "Succsesfully Added new Size and Price!";
        await ProductSchema.updateOne(
          { Flavor: Flavor },
          { $push: { Size: Size } }
        );
        // then add price for that Size
        await ProductSchema.updateOne(
          { Flavor: Flavor },
          { $push: { Price: Price } }
        );

        
      } else {
        notif = "Already Had that size!";
      }

    } 
    else {
      notif = "Succsesfully Added! new Flavor";
      await ProductSchema.create({
        Flavor: Flavor,
        Size: [Size],
        Price : [Price],
        ImageName: ImageName,
      });
    }

    return res.json({ notif: notif });
  } catch (error) {
    console.log(error);
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
}

module.exports = {
  addProduct,
  getAllProduct,
};
