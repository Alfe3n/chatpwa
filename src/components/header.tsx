import React, { useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { GoReport } from "react-icons/go";
import { BsPeople, BsTelephone, BsThreeDotsVertical } from "react-icons/bs";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";

interface HeaderProps {
  data: {
    name: string;
    chats: { sender: { image: string } }[];
    from: string;
    to: string;
  };
}

function Header(props: HeaderProps) {
  const [tripName, setTripName] = useState(props.data.name);
  const [flag, setFlag] = useState(true);
  const categories = props.data.chats.map((x) => x.sender.image);

  const uniqueCategories = [...new Set(categories)];

  return (
    <div className="sticky top-0 z-10 w-full mt-4 bg-[#faf9f4]">
      <div className="flex items-center justify-between text-2xl font-extrabold first-row">
        <div className="flex items-center gap-x-2">
          <button>
            <IoArrowBackSharp />
          </button>
          {flag ? (
            <input
              type="text"
              value={tripName}
              disabled
              className="w-1/2 text-xl font-extrabold"
              onChange={(e) => setTripName(e.target.value)}
            ></input>
          ) : (
            <input
              className="w-1/2 px-1 text-xl font-extrabold border-2 border-black rounded-md"
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            ></input>
          )}
        </div>
        <button>
          <FiEdit onClick={() => setFlag(!flag)} />
        </button>
      </div>
      <div className="flex items-center justify-between mt-4 mb-2 second-row">
        <div className="grid grid-cols-2 rounded-full">
          <img
            src={uniqueCategories[0]}
            className="h-6 rounded-tl-full"
            alt=""
          />
          <img
            src={uniqueCategories[1]}
            className="h-6 rounded-tr-full"
            alt=""
          />
          <img
            src={uniqueCategories[2]}
            className="h-6 rounded-bl-full"
            alt=""
          />
          <img
            src={uniqueCategories[3]}
            className="h-6 rounded-br-full"
            alt=""
          />
        </div>
        <div></div>
        <div className="flex flex-col text-grey ">
          <p>
            From
            <span className="ml-2 font-extrabold text-black ">
              {props.data.from}
            </span>
          </p>
          <p>
            To
            <span className="ml-2 font-extrabold text-black ">
              {props.data.to}
            </span>
          </p>
        </div>
        <Menu placement="bottom">
          <MenuButton as={Button}>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <div className="flex items-center bg-white">
                <BsPeople className="bg-white" />
                <p className="ml-2 bg-white">Members</p>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex items-center bg-white">
                <BsTelephone className="bg-white" />
                <p className="ml-2 bg-white">Share Number</p>
              </div>
            </MenuItem>

            <MenuItem>
              <div className="flex items-center bg-white">
                <GoReport />
                <p className="ml-2 bg-white">Report</p>
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <hr className="w-screen my-6"></hr>
    </div>
  );
}

export default Header;
