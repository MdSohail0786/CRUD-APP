import React from "react";

function Navbar() {
  return (
    <div className="w-full flex justify-between h-20 item-center bg-gray-300 shadow px-5">
      <div className="w-[10%] h-full flex items-center">
        <h1 className="font-bold text-zinc-800 ">CRUD</h1>
      </div>
      <div className="w-[50%]">
        <ul className="w-full h-full flex gap-6 list-none items-center text-zinc-800 font-medium ">
          <li className="cursor-pointer">HOME</li>
          <li className="cursor-pointer">ABOUT</li>
          <li className="cursor-pointer">CONTACT</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
