'use client'
import React , {useContext} from 'react'
import GetHotel from "../../hooks/getHotel"
import { useRouter } from 'next/navigation'
import HotelInfo from '../../[hotel]/HotelInfo'
import { useParams } from 'next/navigation';
import { context } from '../../context/context'
import  AddGuest from "../AddGuest"
function page() {
    const {id} = useParams();
    const {book , setBook} = useContext(context);
    const { data , loading} = GetHotel(id)
    const navigate = useRouter();
     
    return (
      <div className='h-[100vh] bg_url flex justify-center items-center'>
        {loading && <h1>loading...</h1>}
   
        {!loading && <div> <HotelInfo  hotel={data.type} />  </div> }
        <div className="fixed z-[100]">{book && <div className='' ><AddGuest/> </div>}</div>

      </div>
    )
  }
  
  export default page
