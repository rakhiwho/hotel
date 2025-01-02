'use client'
import { IGuest } from '@/interface/guest';
import axios from 'axios'
import React ,{useState} from 'react'
interface Guest{
id :string;
guest :IGuest
}
function GuestBooking() {
    const [loading , setLoading] = useState(false);


    const  guestReg = async (guest :Guest)=>{
        console.log(guest.id)
        setLoading(true)
    try {
        const res = await axios.post(`/api/hotels/guests/?_id=${guest.id}` , guest.guest);

        if(!res.data){
            console.log("something went wrong");
            setLoading(false);
            return ;
        }
        console.log(res.data)
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
    }

  return  {loading , guestReg}
}

export default GuestBooking
