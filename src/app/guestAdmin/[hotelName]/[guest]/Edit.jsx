"use client";
import React, { useState, useEffect, useContext } from "react";
import GuestBooking from "../../../hooks/guestBooking";
import { useParams } from "next/navigation";
import "../../../hotelAdmin/style.css";
import "./style.css";
import { context } from "../../../context/context";
import EditGuest from "../../../hooks/editGuest"

function Edit(data ) {
  const {edit ,id, data:data1 , setEdit } =data
  const [date, setDate] = useState({
    start: data1.start,
    end: data1.end,
  });
  
 
  const [guest, setGuest] = useState({
    fullName: data1.fullName,
    mobileNumber: data1.mobileNumber,
    address: data1.address,
    reason: data1.reason,
    stayDates: date,
    emailID: data1.emailID,
    reason : data1.reason,
    IDProofNumber: data1.IDProofNumber,
  });
 const {loading , editGuest} = EditGuest();
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  const handleSubmit = async () => {
    try {
     
      const res = await editGuest(id ,
        {
          fullName: guest.fullName,
          mobileNumber: guest.mobileNumber,
          address: guest.address,
          reason: guest.reason,
          start: date.start,
          end: date.end,
          emailID: guest.emailID,
          IDProofNumber: guest.IDProofNumber,
        },
      );

      if (!res) {
        setError("something went wrong!");
      }
   setEdit(!edit)
    } catch (error) {
      console.error(error);
      setError("something went wrong");
    }
  };

  return (
    <div className="flex flex-col relative h-[80vh] items-center justify-center ">
      {error != "" && (
        <div className=" error bg-red-400 fontfamily text-white rounded-full justify-center">
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span> {error}</span>
          </div>
        </div>
      )}
      <div className=" flex  relative   bg-slate-100 bg-opacity-90 border-[2px] border-teal-950 rounded-3xl  h-[50vh] w-[70vw]  items-center justify-center ">
        <div className="flec flec-col absolute top-4 ">
          <h4 className="fontfamily text-center text-teal-950 ">edit guest</h4>
          <div className="divider h-[1px] w-[50vw] bg-teal-950 m-0"></div>
        </div>
        {loading && (
          <h1 className=" absolute top-[50%] left-[40%] fontfamily text-teal-950 ">
            loading...
          </h1>
        )}
        {!loading && (
          <div>
            {" "}
            <div className=" flex flex-col  mb-3">
              <div className="flex sm:flex-row flex-col">
                <input
                value={guest.fullName}
                  type="text"
                  className=" outline-none mx-4 placeholder:text-teal-900  bg-slate-100 bg-opacity-70 text-teal-950  fontfamily rounded-xl mb-2 p-2 border-b-[2px] border-teal-950  "
                  placeholder="Full Name"
                  onChange={(e) =>
                    setGuest({ ...guest, fullName: e.target.value })
                  }
                />
                <input
                value={guest.mobileNumber}
                  type="text"
                  className=" outline-none mx-4 rounded-xl placeholder:text-teal-900 fontfamily mb-2 p-2 border-b-[2px] border-teal-950 bg-slate-100 bg-opacity-70"
                  placeholder="Mobile Number"
                  onChange={(e) =>
                    setGuest({ ...guest, mobileNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                value={guest.address}
                  type="text"
                  className=" outline-none mx-4 placeholder:text-teal-900  bg-slate-100 bg-opacity-70 rounded-xl fontfamily mb-2 p-2 border-b-[2px] border-teal-950"
                  placeholder="address"
                  onChange={(e) =>
                    setGuest({ ...guest, address: e.target.value })
                  }
                />
                <input
                value={guest.emailID}
                  type="text"
                  className=" outline-none mx-4 placeholder:text-teal-900  bg-slate-100 bg-opacity-70 rounded-xl fontfamily mb-2 p-2 border-b-[2px] border-teal-950"
                  placeholder="emailID"
                  onChange={(e) =>
                    setGuest({ ...guest, emailID: e.target.value })
                  }
                />
              </div>
              <div className="flex  sm:flex-row flex-col">
                <input
                value={date.start}
                  type="date"
                  className=" outline-none ml-6 mr-12 placeholder:text-teal-900    bg-slate-100 bg-opacity-70 rounded-xl fontfamily mb-2 p-2 border-b-[2px] border-teal-950"
                  placeholder="starting at"
                  onChange={(e) => setDate({ ...date, start: e.target.value })}
                />
                <input
                value={date.end}
                  type="date"
                  className=" outline-none  placeholder:text-teal-900  bg-slate-100 bg-opacity-70 rounded-xl fontfamily mb-2 p-2 border-b-[2px] border-teal-950"
                  placeholder="ending at"
                  onChange={(e) => setDate({ ...date, end: e.target.value })}
                />
              </div>
              <div>
                <input
                value={guest.IDProofNumber}
                  type="text"
                  className=" outline-none mx-4 placeholder:text-teal-900  bg-slate-100 bg-opacity-70 rounded-xl fontfamily mb-2 p-2 border-b-[2px] border-teal-950"
                  placeholder="ID Proof Number"
                  onChange={(e) =>
                    setGuest({ ...guest, IDProofNumber: e.target.value })
                  }
                />
                <select
                  id="reason"
                  className="w-[20%] text-sm py-1 border-[2px] border-teal-950 bg-slate-50 rounded-2xl hover:bg-teal-900 hover:text-white text-teal-950 mx-4"
                  name="reason to visit"
                >
                  <option
                    onClick={(e) =>
                      setGuest({ ...guest, reason: e.target.value })
                    }
                    value="bussiness"
                  >
                    bussiness
                  </option>
                  <option
                    onClick={(e) =>
                      setGuest({ ...guest, reason: e.target.value })
                    }
                    value="holidays"
                  >
                    holidays
                  </option>
                  <option
                    onClick={(e) =>
                      setGuest({ ...guest, reason: e.target.value })
                    }
                    value="personel reason"
                  >
                    personel reason
                  </option>
                </select>
              </div>
            </div>
            <div className="absolute bottom-[15%] left-[0%] items-center w-full  flex justify-center ">
              <button
                onClick={handleSubmit}
                className=" w-[20%] py-1  text-white rounded-2xl hover:bg-teal-900 bg-teal-950 mx-4"
              >
                save
              </button>
              <button
                onClick={() => setEdit(!edit)}
                className="w-[20%] py-1 border-[2px] border-teal-950 bg-slate-50 rounded-2xl hover:bg-teal-900 hover:text-white text-teal-950 mx-4"
              >
                cancel
              </button>
            </div>
          </div>
        )}
        <div className="absolute bottom-2"></div>
      </div>
    </div>
  );
}

export default Edit;
