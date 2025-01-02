"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";
export function UserContextProvider() {
  return useContext<IContext>(context);
}
export interface IContext {
  auth: boolean;
  add: boolean;
  setAdd(add: boolean): void;
  book: boolean;
  setBook(book: boolean): void;
  hotel: string[]; // Updated type
  setHotel(hotel : string[]):void; // Updated type
}

const defaultval: IContext = {
  auth: false,
  add: false,
  setAdd: () => null,
  book: false,
  setBook: () => null,
  hotel: [],
  setHotel: () => null,
};

export const context = createContext<IContext>(defaultval);

function UseContext({ children }) {
  const [cookies] = useCookies(["accessToken"]);
  const [add, setAdd] = useState(false);
  const [book, setBook] = useState(false);
  const pathname = usePathname();
  const [auth, setAuth] = useState(
    pathname === "/login" || pathname === "/signin"
  );
  const [hotel, setHotel] = useState<string[]>([]); // Correct state t

  const valContext: IContext = {
    auth,
    add,
    setAdd,
    book,
    setBook,
    hotel,
    setHotel,
  };

  return <context.Provider value={valContext}>{children}</context.Provider>;
}

export default UseContext;
