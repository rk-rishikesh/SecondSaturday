import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameLoader from "./GameLoader";
import { usePrivy } from '@privy-io/react-auth';
import { generateChatResponse } from "../function/openai";

const EventsPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = usePrivy();

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

  const handleJoinNow = async () => {
    navigate("/dashboard"); // Navigate back to the login page
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {isLoading && <GameLoader />}

      <div className="min-h-screen bg-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" />

        <div className="absolute top-6 right-6 z-20 flex flex-row gap-4">
          <button className="group relative flex items-center justify-center overflow-hidden rounded-lg px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-transform duration-200 transform hover:scale-105">
            <span className="absolute inset-0 bg-black opacity-50 rounded-lg"></span>
            <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-full w-full overflow-hidden rounded-lg [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
            <span className="backdrop absolute inset-[1px] rounded-lg bg-black transition-colors duration-200 group-hover:bg-slate-800"></span>
            <span className="text z-10 text-white font-semibold">
              Create Event
            </span>
          </button>



          <button onClick={handleLogout} className="group relative flex items-center justify-center overflow-hidden rounded-lg px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-transform duration-200 transform hover:scale-105">
            <span className="absolute inset-0 bg-black opacity-50 rounded-lg"></span>
            <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-full w-full overflow-hidden rounded-lg [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
            <span className="backdrop absolute inset-[1px] rounded-lg bg-black transition-colors duration-200 group-hover:bg-slate-800"></span>
            <span className="text z-10 text-white font-semibold">
              Logout
            </span>
          </button>
        </div>

        <div className="w-full flex flex-col justify-center items-center relative z-10 px-4 sm:px-6 lg:px-12 py-6 md:py-12">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent text-white mt-4">
              Dive into the Adventure
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto opacity-80">
              Outplay, Outscore, and Outshine the Competition!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
            {filteredEvents.map((event) => (
              <div class="flex flex-col border-2 border-black overflow-hidden p-1 rounded-xl shadow-large bg-yellow-200 w-80">
                <div class="px-0 py-2 sm:p-4 sm:pb-2">
                  <div class="items-center w-full justify-center grid grid-cols-1 text-left">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 opacity-80 group-hover:opacity-100 transition">
                        <img
                          src={event.imgUrl}
                          alt=""
                          className="w-20 h-20 rounded-full"
                        />
                      </div>
                      <h2 class="text-black font-bold text-lg lg:text-2xl">
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
                    <div class="mt-2">
                      <p>
                        <span class="text-black tracking-tight xl:text-4xl">
                          $100
                        </span>
                        <span class="text-black font-medium text-base">
                          /player
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col flex-1 justify-between pb-8 px-6 sm:px-8 space-y-6 mt-4">
                  <div class="flex flex-col gap-3 sm:flex-row">
                    <a class="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition w-full lg:px-8 lg:py-4 lg:text-2xl px-4 py-2">
                      <button onClick={handleJoinNow}>{event.isActive ? "Enter" : "Register"}</button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;