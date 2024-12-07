import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { injected, useAccount } from "wagmi";
import { WalletOptions } from './wallet'

const LandingPage = ({ setAuthToken, authToken, handleLogout }) => {

  const navigate = useNavigate();
  const { isConnected } = useAccount();

  useEffect(() => {
    console.log(
      `Current connection status: ${isConnected ? "connected" : "disconnected"}`
    );
  }, [isConnected]);



  const onEnter = () => {
    navigate("/events"); // Navigate back to the login page
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black to-gray-900">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/videos/opener.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-6">
        <div className="mt-8">
          <div className="inline-flex items-center justify-center ease-in-out hover:scale-105">
            {!isConnected && (
              // <button onClick={() => connectWallet()} class="comic-button">
              //   WELCOME TO SECOND SATURDAY
              // </button>
              <WalletOptions/>
            )}
            {isConnected && (
              <button onClick={() => onEnter()} class="comic-button">
                ENTER
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
