'use client'
import React, { useState,useEffect , useRef, useContext } from "react";
import Image from "next/image";
import "./style.css"
import city from "../url/images.jpeg";
import { BsPencilSquare } from "react-icons/bs";
import PostHotel from "../hooks/postHotel"
import { context } from "../context/context";
function Add() {
    const {add , setAdd} = useContext(context);
  const [hotel, setHotel] = useState({
    pfp: "",
    hotelName: "",
    owner: "",
    address: "",
    guest: [],
  });
   const [error , setError] = useState("");
  const {data , loading , postHotels } = PostHotel();
  const fileInputRef = useRef(null);
  const handleFileClick = () => {
    fileInputRef.current.click();
  };
  
    useEffect(() => {
      setTimeout(() => {
        setError("");
      }, 3000);
    }, [error]);
  const handleSubmit = async ()=>{
  try {
     if(hotel.hotelName ===""|| hotel.address ===""|| hotel.owner ===""){
    setError(" please , enter all required information !")
      return;
     }
    const res =  await postHotels({hotelName : hotel.hotelName ,owner :hotel.owner , address : hotel.address })
    console.log(res)
    if(!res){
      setError('something went wrong!')
    }
    setAdd(!add)
  } catch (error) {
    setError(error)
  }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        setHotel({...hotel  , pfp : file})
    }
  };
  return (
    <div className="flex flex-col relative h-[80vh] items-center justify-center ">
        {error != '' && <div className=" error bg-red-400 fontfamily text-white rounded-full justify-center">
            <div role="alert" className="alert alert-error">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span> {error}</span>
</div>
        </div> }
      <div className=" flex  relative   bg-slate-100 bg-opacity-90 border-[2px] border-teal-950 rounded-3xl  h-[50vh] w-[80vw]  items-center justify-center ">
        {loading && <h1 className=" absolute top-[50%] left-[30%] text-teal-950 ">loading...</h1>}
        <div>
          <div className=" relative h-[180px] w-[180px] ">
            <BsPencilSquare className="absolute top-50 left-20 z-100 text-black opacity-100 size-10 " />
            <Image
              onClick={handleFileClick}
              src={hotel.pfp || city}  
              alt={"Dynamic image"}
              width={100}
              height={100}
              className="rounded-full opacity-70 h-full w-full cover "
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="invisible"
          />
        </div>
        <div className=" flex flex-col">
          <input
            type="text"
            className=" outline-none placeholder:text-teal-900  bg-slate-100 bg-opacity-70 text-teal-950  fontfamily rounded-xl mb-2 p-2 border-b-[2px] border-teal-950  "
            placeholder="hotel's name"
            onChange={(e)=>setHotel({...hotel , hotelName: e.target.value})}
          />
          <input
            type="text"
            className=" outline-none rounded-xl placeholder:text-teal-900 fontfamily mb-2 p-2 border-b-[2px] border-teal-950 bg-slate-100 bg-opacity-70"
            placeholder="owner's name"
            onChange={(e)=>setHotel({...hotel , owner: e.target.value})}
          />
          <input
            type="text"
            className=" outline-none placeholder:text-teal-900  bg-slate-100 bg-opacity-70 rounded-xl fontfamily mb-2 p-2 border-b-[2px] border-teal-950"
            placeholder="address"
            onChange={(e)=>setHotel({...hotel , address: e.target.value})}
          />
        </div>
        <div className="absolute bottom-[15%] w-full flex justify-center ">
            <button onClick={handleSubmit} className=" w-[30%] py-1 text-white rounded-2xl hover:bg-teal-900 bg-teal-950 mx-4">save</button>
            <button onClick={()=>setAdd(!add)} className="w-[30%] py-1 border-[2px] border-teal-950 bg-slate-50 rounded-2xl hover:bg-teal-900 hover:text-white text-teal-950 mx-4" >cancel</button>
        </div>
        <div className="absolute bottom-2">
          {hotel.pfp === "" && (
            <p className="font-semibold   fontfamily text-teal-950 ">
              set pfp for better recognision
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Add;
