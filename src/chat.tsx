import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Button } from "@chakra-ui/react";
import { GrAttachment } from "react-icons/gr";
import { FiVideo } from "react-icons/fi";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { AiOutlineCamera, AiOutlineSend } from "react-icons/ai";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import Header from "./components/header.tsx";

interface ChatData {
  id: string;
  sender: {
    self: boolean;
    image: string;
  };
  message: string;
}

interface Data {
  name: string;
  chats: ChatData[];
  from: string;
  to: string;
}

function Chatpage() {
  const [data, setData] = useState<Data | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newData, setNewData] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("https://qa.corider.in/assignment/chat?page=0")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function sendNewMessage() {
    if (newMessage !== "") {
      setNewData([...newData, newMessage]);
      setNewMessage("");
    }
    console.log(newData);
  }

  return (
    <div className="items-center justify-center w-full px-4 page-container ">
      {data ? (
        <>
          <Header data={data} />

          <div className="flex flex-col w-full text-sm message-container ">
            {data.chats.map((item) =>
              item.sender.self ? (
                <div
                  key={item.id}
                  className="flex self-end p-2 mb-4 w-fit chat-container drop-shadow-lg bg-blue gap-x-2 rounded-b-xl rounded-tl-xl"
                >
                  <p className="text-sm text-white bg-blue sm:text-lg">
                    {item.message}
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className="flex w-full mb-4 chat-container gap-x-2 sm:text-lg "
                    key={item.id}
                  >
                    <img
                      src={item.sender.image}
                      className="h-8 rounded-full "
                      alt=""
                    ></img>
                    <div className="p-2 bg-white rounded-b-xl rounded-tr-xl drop-shadow-lg">
                      <p
                        className="text-sm bg-white text-grey rounded-xl sm:text-lg"
                        // dangerouslySetInnerHTML={{ __html: item.message }}
                      >
                        {item.message}
                      </p>
                    </div>
                  </div>
                </>
              )
            )}
            {newData ? (
              <>
                {newData.map((item, index) => (
                  <div
                    className="flex self-end p-2 mb-4 w-fit chat-container drop-shadow-lg bg-blue gap-x-2 rounded-b-xl rounded-tl-xl"
                    key={index}
                  >
                    <p className="text-sm text-white bg-blue sm:text-lg">
                      {item}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            className="mt-20 ml-40"
          />
        </>
      )}
      <div className="sticky bottom-0 flex items-center w-full p-2 mt-2">
        <input
          placeholder="Enter your message"
          type="text"
          className="w-full h-10 font-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <div className="flex items-center ">
          <Popover placement="top">
            <PopoverTrigger>
              <Button>
                <GrAttachment />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody className="text-white rounded-full bg-green">
                <div className="flex justify-around bg-green">
                  <AiOutlineCamera className="text-2xl bg-green" />
                  <FiVideo className="text-2xl bg-green" />
                  <HiOutlineDocumentDownload className="text-2xl bg-green" />
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <button>
            <AiOutlineSend
              className="text-2xl"
              onClick={sendNewMessage}
              aria-label="Send"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatpage;
