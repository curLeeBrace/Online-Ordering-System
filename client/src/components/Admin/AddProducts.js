 import React, { useState } from "react";
import { isNum } from "../../customHooks/verifyInput";
import { api } from "../../customHooks/configAxios";

function AddProducts() {
  const [flavor, setFlavor] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [image, setImage] = useState(null);
  

  // add new Product
  const addHandler = (e) =>{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("Flavor", flavor);
    formData.append("Size", size);
    formData.append("Price", parseFloat(price));
    
    

    if(image != null) {
      const imageName = flavor + image.type;
      formData.append("ImageName", imageName.replace("image/", "."));
      formData.append("Image", image, imageName.replace("image/", "."));

    }
      
    



    api.post("/product/add", formData, {
      headers : {"Content-Type" : "multipart/form-data"},     
    })
    .then(res => {
      const {notif} = res.data;
      if(res.status === 200){
        alert(notif)
      }
    })
    .catch(err => console.log(err))
    

    
  }

 
  return (
    <div className="h-screen bg-gray-200 mt-0 pt-10">
      {/* <AdminNavbar /> */}
      <div className="bg-white rounded-lg shadow-2xl p-4 w-full md:w-96 mx-auto pt-10">
        <h2 className="text-2xl font-semibold mb-4">Add New Flavor/Product</h2>
        
        <form onSubmit={addHandler}>
          {/* <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Milk Tea"
              className="w-full p-2 border rounded focus:outline-none"
            />
          </div> */}


          {/* Falvor */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold"
            >
              Flavor:
            </label>
            <input
              id="description"
              name="MTname"
              placeholder="Hokkaido"
              className="w-full p-2 border rounded focus:outline-none"
              required
              value = {flavor}
              onChange={(e) => setFlavor(e.target.value)}
            />
          </div>
          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-semibold">
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              className="w-full p-2 border rounded focus:outline-none"
              required
              value={price}
              onChange = {(e) => isNum(setPrice, e.target.value)}
            />
          </div>
          {/* Size */}
          <label className="block font-semibold">Size:</label>
          <div className="ml-2 space-y-2 mb-2">
            <label>
              <input 
              type="radio" 
              name="payment" 
             
              value = "Small"
              onChange={(e) => setSize(e.target.value)}
              />
              Small
            </label>
            <br></br>
            <label>
              <input 
              type="radio" 
              name="payment" 
              value = "Medium"
              onChange={(e) => setSize(e.target.value)}
              />
              Medium
            </label>
          </div>
          {/* Image */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-semibold">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full p-2 border rounded focus:outline-none"
              onChange={(e)=>{setImage(e.target.files[0])}}
            />
          </div>
          <button
            type="submit"
            className="bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProducts;
