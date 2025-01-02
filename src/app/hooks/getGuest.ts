'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { usePathname } from 'next/navigation';

function GetGuest(_id :string) {
    const [data , setData] = useState([])
    const [loading , setLoading] = useState(true);
    const pathname = usePathname();
    const guest = async ()=>{
        try {
            const res = await axios.get(`/api/hotels/guests/?_id=${_id}`);

            if(!res.data.type){
             setLoading(false);
             return;
            }
            setLoading(false);
            setData(res.data.type)
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }
   useEffect(()=>{
    guest();
   }, [pathname , _id])
  return {data , loading}
}

export default GetGuest
