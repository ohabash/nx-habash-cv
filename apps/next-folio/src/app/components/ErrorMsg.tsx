import { errMsg } from "@/firebase/firebase.config";
import React from "react";
import { MdError } from "react-icons/md";

type Props = {code: string, onClick?: () => void}

export function ErrorMsg({code, onClick}: Props) {
  return (
    <a 
      className="cursor-pointer  border-[4px] border-transparent hover:border-black/60 bg-dark text-white/70 w-full block px-4 py-2 rounded-md mt-4"
      onClick={onClick}
    >
      <div className="flex items-center justify-start">
        <MdError className="text-[3.5rem] mr-3 text-red" />
        {errMsg(code)}
      </div>
    </a>
  );
}
