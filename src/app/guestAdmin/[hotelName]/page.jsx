"use client";
import { useParams } from "next/navigation";
import React from "react";
import GetHotels from "../../hooks/getHotel";
import "../../Navbar/style.css";
import GetGuest from "../../hooks/getGuest";
import { useRouter } from "next/navigation";
function page() {
  const { hotelName } = useParams();
  const naviagtion = useRouter();
  const { data, loading } = GetHotels(hotelName);
  const { data: guest, loading: proccessing } = GetGuest(hotelName);
  console.log(guest);
  let num = 0;
  return (
    <div className=" fixed top-[8vh] flex flex-col justify-start bg_url h-[92vh] w-screen items-center">
      {proccessing && <h1 className="fixed self-center top-[40vh] ">loading...</h1>}

      {!proccessing && (
        <div>
            <h3 className="capitalize ">guests at {data.type.hotelName}:</h3>
          <table className="table-auto  bg-teal-950 bg-opacity-40 border-collapse border-[1px] border-teal-950 w-[80vw] text-sm ">
          <thead class="bg-teal-950 text-white font-light fontfamily ">
      <tr>
        <th class="border border-gray-300 px-4 py-2 text-left">index</th>
        <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
        <th class="border border-gray-300 px-4 py-2 text-left">Mobile Number</th>
      </tr>
    </thead>

            <tbody>
                {guest.map((g)=>(
  <tr key={g._id} onDoubleClick={()=>naviagtion.push(`/guestAdmin/${hotelName}/${g._id}`)} class="hover:bg-teal-50  font-medium ">
  <td class="border border-gray-300 px-4 py-2">{++num}.</td>
  <td class="border border-gray-300 px-4 py-2">{g.fullName}</td>
  <td class="border border-gray-300 px-4 py-2">{g.mobileNumber}</td>
  
</tr>
                ))}
             
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default page;
