import { Carousel } from 'antd'
import React from 'react'

const CarouselComponent = () => {
  return (
    <div className="h-[calc(100vh-6rem)] bg-[url('/public/Carousel1.jpg')] bg-cover">
      <div className="h-full flex flex-col md:flex-row justify-around items-center backdrop-blur-md">
        <div className="p-4 w-full md:w-1/3">
          <p className="mt-4 text-xl md:text-3xl font-black text-blue-600 text-opacity-75 ">
            Mua sắm và trải nghiệm các ưu đãi!
          </p>
          <button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full">
            Mua ngay
          </button>
        </div>
        <Carousel className="w-80 md:w-[30rem] h-64 md:h-80" autoplay autoplaySpeed={3000} infinite>
          <div>
            <img
              src="/Carousel1.jpg"
              alt=""
              className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg drop-shadow-2xl"
            ></img>
          </div>
          <div>
            <img
              src="/Carousel2.jpg"
              alt=""
              className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg drop-shadow-2xl"
            ></img>
          </div>
          <div>
            <img
              src="/Carousel3.jpg"
              alt=""
              className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg drop-shadow-2xl"
            ></img>
          </div>
          <div>
            <img
              src="/Carousel4.jpg"
              alt=""
              className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg drop-shadow-2xl"
            ></img>
          </div>
        </Carousel>
      </div>
    </div>
    // <Carousel arrows autoplay autoplaySpeed={3000} infinite={false}>
    //   <div>
    //     <div>
    //       <img src="/Carousel1.jpg" alt="banner1" className="w-full max-h-[500px]" />
    //     </div>
    //   </div>
    //   <div>
    //     <div>
    //       <img src="/Carousel2.jpg" alt="banner2" className="w-full max-h-[500px]" />
    //     </div>
    //   </div>
    //   <div>
    //     <div>
    //       <img src="/Carousel3.jpg" alt="banner3" className="w-full max-h-[500px]" />
    //     </div>
    //   </div>
    //   <div>
    //     <div>
    //       <img src="/Carousel4.jpg" alt="banner4" className="w-full max-h-[500px]" />
    //     </div>
    //   </div>
    // </Carousel>
  )
}

export default CarouselComponent
