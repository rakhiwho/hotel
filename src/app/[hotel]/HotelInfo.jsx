"use client";
import React, { useContext, useState } from "react";
import img from "../url/city.gif";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import "../Navbar/style.css";
import { context } from "../context/context";
import { useParams, usePathname } from "next/navigation";
import Edit from "./edit";

function HotelInfo(hotel) {
  const pathname = usePathname();
  console.log(pathname)
  const { hotel: id } = useParams();
  const [edit, setEdit] = useState(false);
  const { book, setBook } = useContext(context);

  return (
    <>
      {edit && (
        <div className=" fixed z-[100] p-2 top-[30%] rounded-3xl right-[10%] h-[40%]  flex flex-col items-center justify-center">
          <Edit hotel={hotel} edit={edit} setEdit={setEdit} />
        </div>
      )}

      <div className="flex  flex-col overflow-hidden  justify-start  fontfamily">
        <div className=" absolute top-[0vh] roght-0 opacity-90  avatar">
          {!(pathname.startsWith("/guest")) && (
            <div
              onClick={() => setEdit(!edit)}
              className="fixed  top-[10%] right-[3%] "
            >
              <FaPen className="size-6 text-white " />
            </div>
          )}
          <div className="w-screen h-[28vh] self-center ">
            <Image src={hotel.hotel.logo || img} width={70} height={70} alt="hoteli icon" />
          </div>
        </div>
        <div className="flex fixed top-[20vh]  justify-around items-center lg:px-[20vw] ">
          <div className="avatar ml-10">
            <div className=" h-[150px] w-15 rounded-full self-center ">
              <Image src={hotel.hotel.logo || img} width={100} height={100} alt="hotel icon" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className=" h-10 sm:static absolute inline  rounded-full sm:left-[15%] left-0 top-[22%] bg-opacity-70  bg-blue-950 w-[90vw] text-center  text-white">
              {hotel.hotel.hotelName}
            </h1>

            <div className="flex  mt-10 mr-10  ">
              <h5 className="mx-3">owner :{hotel.hotel.owner}</h5>
              <h5> at: {hotel.hotel.address}</h5>
            </div>
            <div>guests : {hotel.hotel.guest.length}</div>
          </div>
        </div>
        <div className="divider mt-16  sm:mt-0 md:mt-0 lg:mt-0 h-[1px] rounded-2xl bg-teal-950 w-[90vw] self-center " />

        <div className="px-10">
          <h2 className=" capitalize ">description:</h2>
          <p className="">
            A hotel is an establishment that provides paid lodging, meals, and
            other services for travelers and tourists. Hotels range in style,
            size, and amenities, from budget accommodations to luxurious
            resorts, catering to diverse preferences and needs. Facilities may
            include rooms with private bathrooms, Wi-Fi, dining options, pools,
            gyms, conference spaces, and more.
          </p>
        </div>
        {pathname.startsWith("/guest") && (
          <div
            onClick={() => setBook(!book)}
            className="absolute text-white top-16 right-8  text-center"
          >
            Book <div className="divider h-[1px] m-0 w-[10vw] bg-white"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default HotelInfo;
