import React from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { CiLight } from 'react-icons/ci'
import { GiBookCover } from 'react-icons/gi'
import { MdOutlineContactPhone } from 'react-icons/md'

const News = () => {
  return (
    <div className="px-28 py-10 h-[calc(100vh-6rem)]">
      <div className="flex justify-around px-28 pb-10">
        <div></div>
        <div>
          <div className="flex flex-col items-center">
            <GiBookCover className="text-4xl text-sky-400" />
            Cẩm nang
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <CiLight className="text-4xl text-yellow-500" />
            Kiến thức
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <BsPencilSquare className="text-4xl text-gray-400" />
            Tin tức mới
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <MdOutlineContactPhone className="text-4xl text-red-400" />
            Tư vấn mua
          </div>
        </div>
        <div></div>
      </div>
      {/* <div className="flex flex-col sm:flex-row px-28">
        <div className="w-1/2">
          <div>
            <img
              src="/Carousel3.jpg"
              alt=""
              className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg"
            ></img>
          </div>
        </div>
        <div className="w-1/4">
          <div>
            <img
              src="/Carousel3.jpg"
              alt=""
              //   className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg"
            ></img>
            <img
              src="https://i.pinimg.com/736x/fd/68/76/fd687643b45485e951a7273b84837595.jpg"
              alt=""
              //   className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg"
            ></img>
            <img
              src="https://i.pinimg.com/736x/97/52/4a/97524aed1c18b67b2d21083085e9173c.jpg"
              alt=""
              //   className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg"
            ></img>
          </div>
        </div>
        <div className="w-1/4">3</div>
      </div> */}
    </div>
  )
}

export default News
