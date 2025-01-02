"use client";
import React, { useContext } from "react";
import { context } from "../context/context";
import "../globals.css";
import AllHotels from "../hooks/allHotels";
import Hotel from "./Hotel";
import Add from "./Add";
import { useRouter } from "next/navigation";
function page() {
  const { data, loading } = AllHotels();
  const { add } = useContext(context);
  console.log(add);
  const navigation = useRouter();
  return (
    <div className="bg_url  overflow-scroll    h-[92vh] fixed top-[8vh] ">
      <div className="flex  py-2    flex-col  justify-center content-center items-center">
        <h1 className="fontfamily mb-1">Hotels</h1>
        {loading && <h1 className="text-center  w-screen">loading</h1>}

        <div className="flex w-screen  flex-wrap justify-around">
          {!loading &&
            data?.type.map((hotel) => (
              <div
                onClick={() => navigation.push(`/${hotel?._id}`)}
                className="m-1"
                key={hotel._id}
              >
                <Hotel hotel={hotel} />
              </div>
            ))}
        </div>
        <div className="absolute self-center top-[8%]">{add && <Add />}</div>
      </div>
    </div>
  );
}

export default page;
