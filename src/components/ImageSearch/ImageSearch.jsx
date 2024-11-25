import { useState, useRef } from 'react'
import { FaCamera } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const ButtonHandler = ({ imageRef, handleImageDetection, showImageDrawe }) => {
  const [streaming, setStreaming] = useState(null) // streaming state
  const inputImageRef = useRef(null) // video input reference
  const location = useLocation()
  const isProductDetailsPage = location.pathname.startsWith('/product-details/')

  // closing image
  const closeImage = () => {
    const url = imageRef.current.src
    imageRef.current.src = '#' // restore image source
    URL.revokeObjectURL(url) // revoke url

    setStreaming(null) // set streaming to null
    inputImageRef.current.value = '' // reset input image
    imageRef.current.style.display = 'none' // hide image
  }

  return (
    <div className="flex items-center">
      {/* Image Handler */}
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          // Check if file exists before setting the image
          if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]) // create blob url
            imageRef.current.src = url // set image source
            setStreaming('image') // set streaming to image
            imageRef.current.style.display = 'none' // don't show image initially
          }
        }}
        // onChange={(e) => {
        //   const url = URL.createObjectURL(e.target.files[0]) // create blob url
        //   imageRef.current.src = url // set video source
        //   imageRef.current.style.display = 'block' // show video
        //   setStreaming('image') // set streaming to video
        // }}
        ref={inputImageRef}
      />
      <button
        className=" hover:bg-blue-50 p-2 rounded-full"
        onClick={() => {
          // if not streaming
          if (streaming === null) inputImageRef.current.click()
          // closing image streaming
          else if (streaming === 'image') closeImage()
        }}
      >
        {!isProductDetailsPage && <FaCamera className="text-sky-700 text-xl" />}
      </button>
    </div>
  )
}

export default ButtonHandler
