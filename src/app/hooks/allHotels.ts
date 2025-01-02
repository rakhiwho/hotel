"use client";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../context/context";
function AllHotels() {
  const { hotel, setHotel} = useContext(context)
  const pathname = usePathname();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getHotels = async () => {
    const res = await axios.get("api/hotels/allHotels");
    if (!res.data) {
      console.log("something went wrong");
      setLoading(false);
    }
    setData(res.data);
    setHotel(res.data)
    setLoading(false);
  };
  useEffect(() => {
    getHotels();
  }, [pathname , ]);
  return { data, loading };
}

export default AllHotels;
