'use client'
import axios from 'axios'
import React, { useCallback,  useContext , useEffect, useState } from 'react'
import { context } from '../context/context'

function  GetHotels(_id : string) {
 const [data , setData] = useState({})
 const [loading , setLoading] =  useState(true)
 const {book} = useContext(context)
 
  const getHotel = async ()=>{
  
    try {
        const res = await axios.get(`/api/hotels/hotel?_id=${_id}`)
        if(!res.data){
            console.error('something went wrong')
            setLoading(false);
            return;
        }
        setData(res.data);
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
}, [_id , book])
  return  {data , loading  }
}

export default  GetHotels
