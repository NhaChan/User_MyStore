import React from 'react'

const Home = () => {
  return (
    <>
      <div className="bg-white">
        {/* Navbar */}
        <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
          <div className="text-pink-600 text-3xl font-bold">kiddo</div>
          <ul className="hidden md:flex space-x-8">
            <li>
              <a href="#" className="text-gray-700 hover:text-pink-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-pink-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-pink-600">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-pink-600">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-pink-600">
                Contact
              </a>
            </li>
          </ul>
          {/* <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search here"
              className="border rounded-full px-4 py-2"
            />
            <div className="text-gray-700">Login</div>
          </div> */}
        </nav>

        {/* Hero Section */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/800x400"
            alt="Hero"
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold">Discount On Soft Toys</h1>
            <p className="mt-4 text-xl md:text-2xl">
              Looking for the softest thing you and cuddler in high tech world?
            </p>
            <button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full">
              Shop Now
            </button>
          </div>
        </div>

        {/* Categories */}
        <section className="py-16 bg-gray-50">
          <h2 className="text-center text-3xl font-bold mb-8 text-pink-600">Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Baby"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">Newborn</h3>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Funny Hats"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">Funny Hats</h3>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Cute Toys"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">Cute Toys</h3>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Soft Toys"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">Soft Toys</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
