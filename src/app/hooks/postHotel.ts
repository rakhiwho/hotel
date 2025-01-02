"use client";
import axios from "axios";
import { IHotel } from "@/interface/IHotel";
import React, {  useContext, useState } from "react";
import { context } from "../context/context";

function PostHotels() { 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { hotel , setHotel} = useContext(context);
  const postHotels = async (hotel : IHotel ) => {
    setLoading(true)
    const res = await axios.post("api/hotels/register" , hotel);
   console.log(res.data)
    if (!res.data) {
      console.log("something went wrong");
      setLoading(false);
    }
    setData(res.data);
    setHotel([hotel , res.data])
    setLoading(false);
  };
   
  return { data, loading , postHotels };
}

export default PostHotels;
