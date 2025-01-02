import axios from "axios";
import React, { useState } from "react";

function ChangeInfo() {
  const [loading, setLoading] = useState(false);
  const changeInfo = async (
    id: string,
    hotelName: string,
    address: string,
    owner: string
  ) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/hotels/changeHotelDetails/?_id=${id}`, {
        hotelName,
        owner,
        address,
      });

      if (!res) {
        setLoading(false);
        return;
      }
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return {loading , changeInfo}
}

export default ChangeInfo;
