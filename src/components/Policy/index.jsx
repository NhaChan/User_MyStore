import React from 'react'
import { FaCarSide } from 'react-icons/fa'
import { FaArrowsRotate, FaPhoneFlip } from 'react-icons/fa6'
import { MdOutlineSecurity } from 'react-icons/md'

const Policy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-4 grid-cols-2 gap-6 lg:gap-12">
        {/* Free Shipping */}
        <div className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform ">
          <div className="flex flex-col justify-center items-center">
            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
              <FaCarSide className="text-6xl p-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Miễn phí giao hàng</h3>
            <p className="text-gray-600 text-center text-sm">Khi mua đơn hơn 400.000đ</p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform ">
          <div className="flex flex-col justify-center items-center">
            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
              <MdOutlineSecurity className="text-6xl p-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Thanh toán bảo mật</h3>
            <p className="text-gray-600 text-center text-sm">100% bảo mật</p>
          </div>
        </div>

        {/* Return Policy */}
        <div className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform ">
          <div className="flex flex-col justify-center items-center">
            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
              <FaArrowsRotate className="text-6xl p-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">30 ngày hoàn trả</h3>
            <p className="text-gray-600 text-center text-sm">Hoàn tiền trong 30 ngày</p>
          </div>
        </div>

        {/* Support */}
        <div className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform ">
          <div className="flex flex-col justify-center items-center">
            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
              <FaPhoneFlip className="text-6xl p-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Hỗ trợ 24/7</h3>
            <p className="text-gray-600 text-center text-sm">Hỗ trợ mọi lúc nhanh nhất</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Policy
