'use client'
import { useParams } from 'next/navigation'
import React ,{useEffect} from 'react'
 import { useRouter } from 'next/navigation';
import GetHotel from "../hooks/getHotel"
import "../Navbar/style.css"
import { BsCheckLg } from 'react-icons/bs';
import HotelInfo from './HotelInfo';
function page() {
  const {hotel} = useParams();
   
  const { data , loading} = GetHotel(hotel)
  const navigate = useRouter();
   console.log(data)
  return (
    <div className='h-[100vh] bg_url flex justify-center items-center'>
      {loading && <h1>loading...</h1>}
 
      {!loading && <div> <HotelInfo  hotel={data.type} />  </div> }
    </div>
  )
}

export default page
