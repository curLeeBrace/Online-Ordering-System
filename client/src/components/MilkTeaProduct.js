import React, { useState } from 'react';
import { UilMultiply } from '@iconscout/react-unicons';

const MilkTeaProduct = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState('None'); // Initial value is 'None'
  const [, setAddOnPrice, setSizePrice] = useState(0);
  // The price of the milk tea
  const [selectedSize, setSelectedSize] = useState('small'); 
  
  

  const handleBuyClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setQuantity(1); // Reset quantity to 1
    setSelectedAddons('None');
    setAddOnPrice(0);  // Reset add-on price to 0
    setSelectedSize('small'); 
    
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const handleAddonChange = (event) => {
    const addon = event.target.value;
    if (addon === selectedAddons) {
      // Deselect the current add-on
      setSelectedAddons('None');
      setAddOnPrice(0);
    } else {
      setSelectedAddons(addon);
    }
  };

  
  const handleSizeChange = (event) => {
    const sizes = event.target.value;
    if (sizes === selectedSize) {
      // Deselect the current add-on
      setSelectedSize('small');
      setSizePrice(0);
    } else {
      setSelectedSize(sizes);
    }
  };
  const totalPrice = ((selectedSize === 'small' ? 30 : 50) + (selectedAddons === 'Tapioca Pearls' ? 10 : 0)) * quantity;

  

  return (
    <div className="ml-4 mr-4 sm:flex-col justify-center items-center md:flex-row bg-white mt-4 rounded-lg shadow-2xl sm:text-sm md:text-sm p-4 mb-4 md:w-1/2 lg:w-1/4">
      <img
        src="./img/flavor1.png"
        alt="Milk Tea"
        className="md:w-full sm:w-1/2 md:h-60 sm:h-96 object-cover rounded-t-lg justify-center items-center"
      />
      <h2 className=" font-semibold mt-2 mb-2 text-sm">Milk Tea</h2>
      <p className="text-gray-600 text-sm">Hokkaido</p>
      <p className="text-amber-900 font-bold mt-2">₱{totalPrice.toFixed(2)}</p>
      <button
        onClick={handleBuyClick}
        className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
      >
        Buy
      </button>
      

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center ml-4 mr-4 justify-center z-50 ">
          <div className="bg-white rounded-lg mt-0 shadow-2xl border border-amber-950 p-4 w-full md:w-96">
            <button
              onClick={handleModalClose}
              className="relative top-7 ml-64 md:left-0 md:ml-80 ml-56 font-bold hover:text-gray-700 cursor-pointer"
            >
              <UilMultiply size={20}/>
            </button>
            <h2 className="text-xl font-semibold mb-4 mt-0">Select Options</h2>
            <label htmlFor="quantity" className="block font-semibold">
              Quantity:
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="w-16 p-2 rounded border border-gray-300 focus:outline-none"
              />
            </label>
            <label className="block font-semibold mt-4">Size:</label>
            <div className="ml-4 space-y-2">
              <label>
                <input
                  type="radio"
                  name="sizes"
                  value="small"
                  checked={selectedSize === 'small'}
                  onChange={handleSizeChange}
                />{' '}
                Small (₱30)
              </label>
              <br></br>
              <label>
                <input
                  type="radio"
                  name="sizes"
                  value="medium"
                  checked={selectedSize === 'medium'}
                  onChange={handleSizeChange}
                />{' '}
                Medium (₱50)
              </label>
            </div>

            <label className="block font-semibold mt-4">Adds-On:</label>
            <div className="ml-4 space-y-2">
              <label>
                <input
                  type="radio"
                  name="addon"
                  value="None"
                  checked={selectedAddons === 'None'}
                  onChange={handleAddonChange}
                />{' '}
                None
              </label>
              <br></br>
              <label>
                <input
                  type="radio"
                  name="addon"
                  value="Tapioca Pearls"
                  checked={selectedAddons === 'Tapioca Pearls'}
                  onChange={handleAddonChange}
                />{' '}
                Tapioca Pearls (+₱10)
              </label>
              
            </div>

            <label className="block font-semibold mt-4">Mode of payment:</label>
            <div className="ml-4 space-y-2">
              <label>
                <input
                  type="radio"
                  name="payment"
                 
                />{' '}
                Gcash
              </label>
              <br></br>
              <label>
                <input
                  type="radio"
                  name="payment"
                  
                />{' '}
                Cash-on Delivery
              </label>
              
            </div>

            <p className="text-amber-900 font-bold mt-4">
              Total: ₱{totalPrice.toFixed(2)}
            </p>
            <button
              onClick={handleModalClose}
              className="mt-4 bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none w-full"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MilkTeaProduct;
