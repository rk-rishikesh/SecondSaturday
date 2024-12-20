import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ListIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GameLoader from "./GameLoader";

import { generateChatResponse } from "../function/openai";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../data/contractDetails";

const EventsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [group, setGroup] = useState([]);

  useEffect(() => {
    const fetchRegisteredPlayers = async () => {
      try {
        const response = await fetch(
          "https://backend-second-saturday.vercel.app/api/thegraph/players-registered"
        );
        if (!response.ok) {
          console.error("ERROR: Failed to load data");
          return;
        }
        const jsonData = await response.json();
        console.log(jsonData.data.playerRegistered1S);
        setGroup(jsonData.data.playerRegistered1S);
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    fetchRegisteredPlayers();
  }, []);
  
  const events = [
    {
      id: 1,
      name: "Banglore Mania",
      isActive: true,
      category: "Gaming",
      description:
        "A fast-paced, high-energy competition where the stakes are as high as the excitement",
      participants: 100,
      prize: "$500 Cash",
      imgUrl: "/images/bang.jpg",
      fee: 100,
      maxParticipants: 100,
    },
    {
      id: 2,
      name: "Bombay Blitz",
      isActive: false,
      category: "Learning",
      description:
        "A thrilling race to dominate the board and claim victory before your opponents",
      participants: 10,
      prize: "",
      imgUrl: "/images/mumbai.jpg",
      fee: 100,
      maxParticipants: 100,
    },
    {
      id: 3,
      name: "Delhi Delight",
      isActive: false,
      category: "Community",
      description:
        "A legendary showdown to crown the greatest Monopoly player of all time",
      participants: 4,
      prize: "",
      imgUrl: "/images/delhi.jpg",
      fee: 100,
      maxParticipants: 100,
    },
  ];

  const filteredEvents =
    activeFilter === "all"
      ? events
      : events.filter((event) =>
          activeFilter === "active" ? event.isActive : !event.isActive
        );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    navigate("/");
  };

  const register = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        setIsLoading(true);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        const tx = await contract.register();
        await tx.wait(); // Wait for the transaction to be mined
        setIsLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <>
      {isLoading && <GameLoader />}

      <div className="min-h-screen bg-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" />

        <div className="absolute top-6 right-6 z-20 flex flex-row gap-4">
          <button onClick={handleLogout} className="comic-button">
            <span className="text z-10 font-semibold">Back</span>
          </button>
        </div>

        <div className="w-full flex flex-col justify-center items-center relative z-10 px-4 sm:px-6 lg:px-12 py-6 md:py-12">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent text-white mt-4">
              Outwit, Outplay, Outlast
            </h1>
            {/* <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto opacity-80">
              Outplay, Outscore, and Outshine the Competition!
            </p> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col border-2 border-black overflow-hidden p-1 rounded-xl shadow-large bg-yellow-200 w-80"
              >
                <div className="px-0 py-2 sm:p-4 sm:pb-2">
                  <div className="items-center w-full justify-center grid grid-cols-1 text-left">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 opacity-80 group-hover:opacity-100 transition">
                        <img
                          src={event.imgUrl}
                          alt=""
                          className="w-20 h-20 rounded-full"
                        />
                      </div>
                      <h2 className="text-black font-bold text-lg lg:text-2xl">
                        {event.name}
                      </h2>
                    </div>
                    <div className="mb-4 mt-4 w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          Registered Participants
                        </span>
                        <span className="text-sm font-bold text-gray-600">
                          {event.participants} / {event.maxParticipants}
                        </span>
                      </div>
                      <div className="w-full bg-blue-900 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${
                              (event.participants / event.maxParticipants) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-2 items-center flex flex-col">
                      <button
                        className="comic-button h-10 text-xs"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        View List
                      </button>
                      <p className="mt-4">
                        <span className="text-black tracking-tight xl:text-4xl">
                          $100
                        </span>
                        <span className="text-black font-medium text-base">
                          /player
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-1 justify-between pb-8 px-6 sm:px-8 space-y-6 mt-4">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition w-full lg:px-8 lg:py-4 lg:text-2xl px-4 py-2">
                      <button onClick={() => register()}>
                        {event.isActive ? "Enter" : "Register"}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute z-10 mt-2 w-[100] bg-white 
              border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
            >
              {/* Grouped Items */}
              {group.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="px-4 py-2 hover:bg-gray-100 
                  rounded cursor-pointer transition text-sm text-gray-700 border-b border-gray-200"
                >
                  <p>
                    <strong>Player:</strong> {item.player}
                  </p>
                  <p>
                    <strong>Transaction Hash:</strong> {item.transactionHash}
                  </p>
                  <p>
                    <strong>Block Number:</strong> {item.blockNumber}
                  </p>
                  <p>
                    <strong>Block Timestamp:</strong>{" "}
                    {new Date(
                      parseInt(item.blockTimestamp) * 1000
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventsPage;


