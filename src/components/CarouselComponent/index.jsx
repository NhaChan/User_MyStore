import { Carousel } from 'antd'
import React from 'react'

const CarouselComponent = () => {
  return (
    <div className="h-[calc(100vh-6rem)] bg-[url('/public/Carousel1.jpg')] bg-cover">
      <div className="h-full flex flex-col md:flex-row justify-around items-center backdrop-blur-md">
        <div className="p-2 w-full md:w-1/2">
          <p className="mt-4 text-xl md:text-4xl font-black text-blue-600 text-opacity-75 ">
            Mua sắm và trải nghiệm các ưu đãi!
          </p>
          <div className="mt-6 w-fit bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full">
            Mua sắm ngay bây giờ
          </div>
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
    // <div className=" bg-cover">
    //   <Carousel arrows autoplay autoplaySpeed={3000} infinite={false}>
    //     <div>
    //       <div>
    //         <img src="b1.png" alt="banner1" className="w-full h-[calc(100vh-6rem)]" />
    //       </div>
    //     </div>
    //     <div>
    //       <div>
    //         <img src="b2.png" alt="banner2" className="w-full h-[calc(100vh-6rem)]" />
    //       </div>
    //     </div>
    //     <div>
    //       <div>
    //         <img src="b3.png" alt="banner3" className="w-full h-[calc(100vh-6rem)]" />
    //       </div>
    //     </div>
    //     <div>
    //       <div>
    //         <img src="b1.png" alt="banner4" className="w-full h-[calc(100vh-6rem)]" />
    //       </div>
    //     </div>
    //   </Carousel>
    // </div>
  )
}

export default CarouselComponent
