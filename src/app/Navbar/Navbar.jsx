'use client'
import React ,{useContext, useEffect} from 'react';
import './style.css'
import { FaRegSquarePlus } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import { context } from '../context/context';
import { useRouter } from 'next/navigation';
function Navbar() {
  const navigation = useRouter();
  const pathname = usePathname();
  const {add , setAdd} = useContext(context)
  return (
    <div>
     <div className=" fixed h-[8vh] z-[100] flex flex-row justify-between w-[100vw] bg-teal-950">
  <div className="navbar-start">
    <div className="dropdown  ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle flex flex-row items-center content-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu  menu-sm dropdown-content bg-opacity-70 text-white rounded-box z-[1] mt-3 w-[20vw] p-2 shadow  bg-teal-700">

        <li className=' hover:bg-teal-950 hover:bg-opacity-70 rounded-2xl py-2 pl-2 ' onClick={()=>navigation.push("/")}><>Homepage</></li>
        <div className='h-[1px] w-full bg-teal-950' ></div>

        <li className='w-full  hover:bg-teal-950 hover:bg-opacity-70 rounded-2xl py-2 pl-2 ' onClick={()=>navigation.push("/hotelAdmin")} ><>hotel admin</></li>
        <div className='h-[1px]   bg-teal-950 w-full' ></div>

        <li className=' hover:bg-teal-950 hover:bg-opacity-70 rounded-2xl py-2 pl-2 ' onClick={()=>navigation.push("/guest")} ><>guest</></li>
        <div className='h-[1px] w-full bg-teal-950' ></div>

        <li className=' hover:bg-teal-950 w-full hover:bg-opacity-70 rounded-2xl py-2 pl-2 ' onClick={()=>navigation.push("/guestAdmin")} ><>guest admin</></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center ">
    <p className=" dancing-script font-bold ml-2 text-white text-3xl">hotel+</p>
  </div>
  <div className="navbar-end flex flex-row items-center content-center ">
    <input type="text" className='input bg-slate-100 bg-opacity-5 text-slate-100 h-fit text-opacity-80' />
    <button className="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
    { pathname==="/hotelAdmin"  &&  <FaRegSquarePlus className='text-white size-5 ' onClick={()=>setAdd(!add)}  />}
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
</div>
    </div>
  );
}

export default Navbar;
