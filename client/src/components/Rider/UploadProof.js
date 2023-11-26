import React from 'react'

function UploadProof() {
  return (
    <div className='h-screen bg-gray-200 mt-0 pt-10'>
        <div className='bg-white rounded-lg shadow-2xl p-4 w-full md:w-96 mx-auto pt-10'>
        <div className="mb-4">
            <p className='font-bold mb-2'>Upload the delivery proof</p>
            <label htmlFor="image" className="block text-sm font-semibold">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full p-2 border rounded focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-lime-800 text-white px-4 py-2 rounded hover:bg-amber-900 focus:outline-none"
          >
            Upload
          </button>
    </div>
    </div>
  )
}

export default UploadProof