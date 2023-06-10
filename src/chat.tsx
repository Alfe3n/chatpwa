import { useState, useEffect, useRef } from "react";
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
  chats: Chat[];
  name: string;
  from: string;
  to: string;
}

interface Chat {
  id: string;
  sender: {
    self: boolean;
    image: string;
  };
  message: string;
}

function Chatpage() {
  const [data, setData] = useState<ChatData | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newData, setNewData] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get<ChatData>("https://qa.corider.in/assignment/chat?page=0")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        console.log(data?.chats);
        scrollToBottom(); // Scroll to the last message
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    scrollToBottom(); // Scroll to the last message whenever `data` changes
  }, [data]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendNewMessage = () => {
    setNewData([...newData, newMessage]);
    console.log(newData);
  };
  return (
    <div className="w-full page-container">
      {data ? (
        <>
          <Header data={data} />
          <div className="flex flex-col w-full message-container">
            {data.chats.map((item) =>
              item.sender.self ? (
                <div key={item.id}>
                  <div className="flex self-end w-full p-2 mb-4 chat-container drop-shadow-lg bg-blue gap-x-2 rounded-b-xl rounded-tl-xl">
                    <p
                      className="text-lg text-white bg-blue"
                      dangerouslySetInnerHTML={{ __html: item.message }}
                    ></p>
                  </div>
                </div>
              ) : (
                <div
                  className="flex w-full mb-4 chat-container gap-x-2 "
                  key={item.id}
                >
                  <img
                    src={item.sender.image}
                    className="h-8 rounded-full "
                    alt="sender"
                  />
                  <div className="p-2 bg-white rounded-b-xl rounded-tr-xl drop-shadow-lg">
                    <p
                      className="text-lg bg-white text-grey rounded-xl"
                      dangerouslySetInnerHTML={{ __html: item.message }}
                    ></p>
                  </div>
                </div>
              )
            )}
            {newData.map((item) => (
              <div
                key={item}
                className="flex self-end w-full p-2 mb-4 chat-container drop-shadow-lg bg-blue gap-x-2 rounded-b-xl rounded-tl-xl"
              >
                <p className="text-lg text-white bg-blue">{item}</p>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Ref for scrolling to the bottom */}
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
      <div className="sticky bottom-0 flex items-center w-full p-2 text-lg">
        <input
          placeholder="Enter your message"
          type="text"
          className="w-full h-10"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <div className="flex items-center bg-transparent">
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
            <AiOutlineSend className="text-2xl" onClick={sendNewMessage} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatpage;
