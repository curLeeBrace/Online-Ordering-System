import React, { Fragment, useEffect, useState } from "react";
import { UilMultiply } from "@iconscout/react-unicons";
import { isNum } from "../../customHooks/verifyInput";
import { api } from "../../customHooks/configAxios";

function AddProducts() {
  const [flavor, setFlavor] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState();
  const [products, setProducts] = useState([]);
  let thClass = "border-2 border-amber-900 p-2";
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  // add new Product
  const addHandler = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Flavor", flavor);
      formData.append("Size", size);
      formData.append("Price", parseFloat(price));
  
      if (image !== null || image !== undefined) {
        const imageName = flavor + image.type;
        formData.append("ImageName", imageName.replace("image/", "."));
        formData.append("Image", image, imageName.replace("image/", "."));
      }
  
      api
        .post("/product/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          const { notif } = res.data;
          if (res.status === 200) {
            alert(notif);
            // alert("Succsessfully Added!");
          } else {
            alert("Error occured!");
          }
        })
        .catch((err) => console.log(err));
      
    } catch (error) {
      console.error(error);
    }
  };

  const seeAllProducts = () => {
    api
      .get("/product/getAll")
      .then((res) => {
        console.log(res.data)
        setProducts(res.data);
        setIsOrderDetailsOpen(true);
      })
      .catch((err) => console.log(err));
  };


  const deleteProduct = (productID, imageName) => {
    let result = window.confirm("Are you sure you want to delete it?");
    if(result){
      api.post('/product/delete', {productID, imageName})
      .then(res => {
        if(res.status === 200){
          alert("Deleted  Sucsessfully!");
          window.location.href = window.location.href;
          
        } else {
          alert("Error Occure Please Contact Mellanio!")
        }
      })

    } else {
      alert("Canceled!")
    }
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
              value={flavor}
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
              onChange={(e) => isNum(setPrice, e.target.value)}
            />
          </div>
          {/* Size */}
          <label className="block font-semibold">Size:</label>
          <div className="ml-2 space-y-2 mb-2">
            <label>
              <input
                type="radio"
                name="payment"
                value="Small"
                onChange={(e) => setSize(e.target.value)}
              />
              Small
            </label>
            <br></br>
            <label>
              <input
                type="radio"
                name="payment"
                value="Medium"
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
              accept="image/*"
              className="w-full p-2 border rounded focus:outline-none"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none mb-4"
          >
            Add Product
          </button>
        </form>
        <button
          type=""
          onClick={seeAllProducts}
          className="bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none"
        >
          See Products
        </button>
      </div>
      {isOrderDetailsOpen && (
        <div className="fixed inset-0 flex items-center ml-4 mr-4 justify-center z-50 ">
          <div className="bg-white rounded-lg mt-0 shadow-2xl border border-amber-950 p-4 w-full md:w-auto">
            <button
              onClick={() => setIsOrderDetailsOpen(false)}
              className="relative-auto top-auto ml-64 md:left-0 md:ml-80 ml-56 font-bold hover:text-gray-700 cursor-pointer hover:scale-150"
            >
              <UilMultiply size={20} />
            </button>
            <table className="min-w-full border border-gray-300 mb-2 text-sm whitespace-nowrap">
              <thead className="mb-2">
                <tr>
                  {/* <th className={thClass}>Product</th> */}
                  <th className={thClass}>Flavor</th>
                  <th className={thClass}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <Fragment key={product._id}>
                      <tr>
                        <td className={thClass}>{product.Flavor}</td>
                        {/* <td className={thClass}>Tarantado</td> */}

                        <td className={thClass}>
                          <button 
                            className="mt-4 bg-red-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
                            onClick={() => deleteProduct(product._id, product.ImageName)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProducts;
