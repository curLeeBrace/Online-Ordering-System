import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';


function AddProducts() {
    return (
      <div className='h-screen bg-gray-200 mt-0'>
        <AdminNavbar />
      <div className="bg-white rounded-lg shadow-2xl p-4 w-full md:w-96 mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Add New Flavor/Product</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">Name:</label>
            <input type="text" id="name" name="name" 
            placeholder='Milk Tea' 
            className="w-full p-2 border rounded focus:outline-none" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold">Flavor:</label>
            <input id="description" name="description"  
            placeholder='Hokkaido' className="w-full p-2 border rounded focus:outline-none" />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-semibold">Price:</label>
            <input type="number" id="price" name="price"  className="w-full p-2 border rounded focus:outline-none" />
          </div>
          <label className="block font-semibold">Size:</label>
              <div className="ml-2 space-y-2 mb-2">
                <label>
                  <input
                    type="radio"
                    name="payment"/>
                  Small
                </label>
                <br></br>
                <label>
                  <input
                    type="radio"
                    name="payment"/>
                  Medium
                </label>
                
              </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-semibold">Image:</label>
            <input type="file" id="image" name="image" className="w-full p-2 border rounded focus:outline-none" />
          </div>
          <button type="button" className="bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none">
            Add Product
          </button>
        </form>
      </div>
      </div>
    );
}



export default AddProducts;
