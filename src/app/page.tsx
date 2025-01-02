 'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar/style.css'

// import '../styles/globals.css'; // Your custom global styles (optional)


export default function Page() {
  const router = useRouter();
  const [auth , setAuth ] = useState(true);
   
  return (
    <div className="  flex flex-col  fixed top-[7vh] h-full w-full bg_url bg-opacity-50 ">
      <div className='h-[10vh] relative flex w-full m-7 mt-[7vh]   items-center '>

       <h3 className=' absolute z-[100]  fontfamily w-full text-teal-100 font-semibold bg-teal-800 bg-opacity-50 rounded-lg p-2 '>Hey , welcome to hotel+  <br/> we provide  secure and best hotels avaible in area.</h3>
       <div className=" mt-10 h-full w-full  blur-edges " ></div>
       <div className=" absolute w-[50vw] h-full rounded-xl right-0 bg_gif " ></div>
      </div>
      <h4 className='text-center text-md'>choose why did you visited this page</h4>
      <div>
        {/* <div className='h-[70vh] w-[80vw] rounded-2xl bg-teal-950 content-center m-10 blur-sm opacity-50'></div> */}
         <div className=' absolute top-[40%] left-[30%] flex flex-col border-[2px] border-teal-950 p-10 h-fit w-[40vw] rounded-2xl'>
         <button onClick={()=>router.push('/hotelAdmin')} className='text-2xl text-white border-[1px] border-teal-950 rounded-2xl fontfamily bg-teal-950 mb-2 hover:bg-teal-800 '>Hotel admin</button>
         <button onClick={()=>router.push('/guestAdmin')} className='text-2xl text-white border-[1px] border-teal-950 rounded-2xl fontfamily bg-teal-950 mb-2 hover:bg-teal-800  '>Guest admin</button>
         <button onClick={()=>router.push('/guest')} className='text-2xl text-white border-[1px] border-teal-950 rounded-2xl fontfamily bg-teal-950 hover:bg-teal-800 font-thin '>Guest</button>
         </div>
      </div>
    </div>
  );
}
