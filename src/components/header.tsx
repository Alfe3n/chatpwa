import React, { useState } from "react";
import { GoReport } from "react-icons/go";
import { BsPeople, BsTelephone, BsThreeDotsVertical } from "react-icons/bs";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

interface HeaderProps {
  data: {
    name: string;
    from: string;
    to: string;
  };
}

const Header: React.FC<HeaderProps> = (props) => {
  const [tripName, setTripName] = useState(props.data.name);
  const [flag, setFlag] = useState(true);

  return (
    <div className="sticky top-0 z-10 w-full mt-4">
      <div className="flex items-center justify-between text-2xl font-extrabold first-row">
        <div className="flex items-center gap-x-2">
          <IoArrowBackSharp />
          {flag ? (
            <input
              type="text"
              value={tripName}
              disabled
              className="w-12"
              onChange={(e) => setTripName(e.target.value)}
            ></input>
          ) : (
            <input
              className="w-12"
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            ></input>
          )}
        </div>

        <FiEdit onClick={() => setFlag(!flag)} />
      </div>
      <div className="flex items-center justify-between my-2 second-row">
        <div className="h-8 rounded-full bg-blue">p</div>
        <div className="flex flex-col text-grey ">
          <p>
            From
            <span className="font-extrabold text-black ">
              {props.data.from}
            </span>
          </p>
          <p>
            To{" "}
            <span className="font-extrabold text-black "> {props.data.to}</span>
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
              <div className="flex items-center">
                <BsTelephone className="bg-white" />
                <p className="ml-2 bg-white">Share Number</p>
              </div>
            </MenuItem>

            <MenuItem>
              <div className="flex items-center">
                <GoReport />
                <p className="ml-2">Report</p>
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <hr className="my-6"></hr>
    </div>
  );
};

export default Header;
