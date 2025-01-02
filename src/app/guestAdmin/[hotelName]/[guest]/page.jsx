"use client";
import React,{useState} from "react";
import OneGuest from "../../../hooks/oneGuest";
import { useParams } from "next/navigation";
import { FaPen } from "react-icons/fa6";
import Edit from "./Edit";
import './style.css'
import "../../../globals.css"
function page() {
  const { guest } = useParams();
  const { data, loading } = OneGuest(guest);
  const [edit , setEdit] = useState(false);

  return (
    <div className=" fixed top-[8vh] flex flex-col justify-center content-center bg_url h-[92vh] w-screen items-center">
      <h1 className="capitalize flex">guest's info
        {edit && <div className="fixed left-[20%] top-[15%] ">

          <Edit data={data} id={guest} edit={edit} setEdit={setEdit} />
        </div> 
        } 
   <div onClick={()=>setEdit(!edit)} className=" flex justify-center text-xl font-medium "> <FaPen /></div>
         </h1>
      {loading && <h1>loading...</h1>}
      {!loading && (
        <div className=" flex flex-col content-center  fontfamily  justify-center items-center">
          <div className="flex justify-center content-center ">
            <div className="divider bg-teal-950 h-[2px] w-[35vw]"></div>
            <h1 className="fontfamily">{data.fullName} </h1>
            <div className="divider bg-teal-950 h-[1px] w-[35vw]"></div>
          </div>
          <div className="grid grid-cols-2  gap-x-4 items-center justify-center">
            <div>
              <h3>emailID : </h3>
              <h3>address: </h3>
              <h3 className="capitalize">staying period : </h3>
              <h3 className="capitalize">phone no. : </h3>
              <h3 className="capitalize font-thin "> reason for visiting :</h3>
              <h3 className="capitalize font-thin "> id proof number : </h3>
            </div>

            <div>
              <h3 className="block text-xl">{data.emailID}</h3>
              <h3 className="text-xl "> {data.address}</h3>
              <h3 className="text-xl block"> from {data.start} to {data.end}</h3>
              <h3 className="text-xl "> {data.mobileNumber} </h3>
              <h3 className="block text-xl">{data.reason}</h3>
              <h3 className="text-xl "> {data.IDProofNumber}</h3>
            </div>
          </div>

          <div className="divider  bg-teal-950 h-[2px] w-[90vw] self-center "></div>
        </div>
      )}
    </div>
  );
}

export default page;
