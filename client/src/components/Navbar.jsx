import React from "react";

function Navbar() {
  return (
    <div className="w-full bg-gray-300 shadow">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="h-20 flex items-center justify-between gap-4">
          <div className="flex items-center">
            <h1 className="font-bold text-zinc-800 text-lg sm:text-xl">CRUD</h1>
          </div>

          <div className="flex-1 flex justify-end">
            <ul className="flex flex-wrap justify-end gap-4 sm:gap-6 list-none items-center text-zinc-800 font-medium">
              <li className="cursor-pointer">HOME</li>
              <li className="cursor-pointer">ABOUT</li>
              <li className="cursor-pointer">CONTACT</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
