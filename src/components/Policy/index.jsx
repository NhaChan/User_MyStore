import React from 'react'
import { FaCarSide } from 'react-icons/fa'
import { FaArrowsRotate, FaPhoneFlip } from 'react-icons/fa6'
import { MdOutlineSecurity } from 'react-icons/md'

const Policy = () => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-16 px-8">
      <div className="flex flex-col justify-center items-center px-5 py-6 ">
        <FaCarSide className="text-white text-6xl p-3 bg-indigo-600 bg-opacity-75 rounded-full " />
        <div className="text-center text-lg text-slate-400 p-3">Miễn phí giao hàng</div>
        <div className="text-slate-500">Khi mua đơn hơn 400.000đ</div>
      </div>

      <div className="flex flex-col items-center px-5 py-6 justify-center">
        <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
          <MdOutlineSecurity className="text-white text-4xl" />
        </div>
        <div className="text-center text-lg text-slate-400 p-3">Thanh toán bảo mật</div>
        <div className="text-slate-500">100% bảo mật</div>
      </div>
      <div className="flex flex-col items-center px-5 py-6 justify-center">
        <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
          <FaArrowsRotate className="text-white text-4xl" />
        </div>
        <div className="text-center text-lg text-slate-400 p-3">30 ngày hoàn trả</div>
        <div className="text-slate-500">Hoàn tiền trong 30 ngày</div>
      </div>
      <div className="flex flex-col items-center px-5 py-6 justify-center">
        <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
          <FaPhoneFlip className="text-white text-4xl" />
        </div>
        <div className="text-center text-lg text-slate-400 p-3">Hỗ trợ 24/7</div>
        <div className="text-slate-500">Hỗ trợ mọi lúc nhanh nhất</div>
      </div>
    </div>
  )
}

export default Policy
