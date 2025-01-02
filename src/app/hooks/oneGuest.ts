'use client'
import axios from 'axios'
import React, {    useEffect, useState } from 'react'

function  OneGuest(_id : string) {
 const [data , setData] = useState({})
 const [loading , setLoading] =  useState(true)
 
  const getHotel = async ()=>{
  
    try {
        const res = await axios.get(`/api/hotels/guest?_id=${_id}`)
        if(!res.data){
            console.error('something went wrong')
            setLoading(false);
            return;
        }
        setData(res.data.type);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.error(error)
    }
  }

useEffect(()=>{
    if(_id !=""){

        getHotel();
    }
}, [_id ])
  return  {data , loading  }
}

export default  OneGuest
