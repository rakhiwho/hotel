import React from 'react'
import Image from 'next/image';
import city from "../url/gify.gif"
import { FaAngleDoubleRight } from "react-icons/fa";
import './style.css'
import "../Navbar/style.css"
function Hotel(hotel) {

    const {hotelName , _id , address , owner ,  logo} = hotel.hotel;
     
  return (
    <div className=' flex bg_animation  relative     h-fit w-full border-[2px] border-teal-950 p-2 rounded-2xl '>
     <Image
     className=' rounded-2xl '
        src={logo || city} 
        alt="Description of the image"
        height={100}
        width={100}    
           />
      <div className='mx-2 border-l-[2px] border-teal-950 rounded-lg p-3  '>

      <h3 className='fontfamily '>{hotelName}</h3>
      <p className='font-mono'> <span className='font-semibold' >owner</span> : {owner}</p>
     <p className='font-mono'> <span className='font-semibold ' >at</span> : {address}</p>
     <button className='absolute top-3 right-3'><FaAngleDoubleRight /></button>
      </div>
    </div>
  )
}

export default Hotel
