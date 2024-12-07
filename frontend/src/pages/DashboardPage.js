import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coins, ShieldPlus, RefreshCw } from "lucide-react";
import mapboxgl from "mapbox-gl";
import carddata from "../data/cards";
import GameLoader from "./GameLoader";
import { ethers } from "ethers";
import { Leaf, Target } from "lucide-react";
import { useAccount } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../data/contractDetails";

const DashboardPage = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const playerMarkerRef = useRef(null);
  const [playerLocation, setPlayerLocation] = useState(0);
  const [diceRoll, setDiceRoll] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5);
  const [showMintCard, setShowMintCard] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [card, setCard] = useState();
  const [bal, setBal] = useState(0);
  const [bank, setBank] = useState(false);
  const [pos, setPosition] = useState(0);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoanCard, setShowLoanCard] = useState(false);
  const [loan, setLoanAmt] = useState(0);
  const { address } = useAccount();

  const handleLoanClick = () => {
    setShowLoanCard(!showLoanCard);
  };

  const RPC_URL =
    "https://base-sepolia.g.alchemy.com/v2/BAdEZyuBRoUZJXxgJpKpe_USdCsARC7I";
  // const RPC_URL = "https://polygon-amoy.g.alchemy.com/v2/BAdEZyuBRoUZJXxgJpKpe_USdCsARC7I";
  // const RPC_URL = "https://bnb-testnet.g.alchemy.com/v2/BAdEZyuBRoUZJXxgJpKpe_USdCsARC7I"

  useEffect(() => {
    readFromContract();
    setCard(carddata.cards[pos]);
    setShowCardDetails(true);
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setShowMintCard(true);
    }
  }, [remainingTime]);

  const readFromContract = async () => {
    try {
      setLoading(true);

      // Connect to the Polygon Mumbai Testnet using ethers
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );
      const result = await contract.getPlayerCurrency(address);
      const position = await contract.getPlayerPosition(address);
      setPosition(position);
      setBal(result.toLocaleString());
      setCard(carddata.cards[position]);
    } catch (err) {
      console.error("Error reading from contract:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMintCardClick = async () => {
    try {
      setIsLoading(true);
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

        const tx = await contract.nextMove();
        await tx.wait(); // Wait for the transaction to be mined
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error calling API:", error);
    }

    // Call your other functions after the API call
    rollDiceAndMove();
    setRemainingTime(10);
    setShowMintCard(false);
    setShowCardDetails(true);
  };

  const monopolyLocations = carddata.cards;

  const rollDiceAndMove = () => {
    if (rolling) return;

    const newDiceRoll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(newDiceRoll);
    setRolling(true);

    let currentStep = playerLocation;
    let stepsRemaining = newDiceRoll;

    const movePlayer = () => {
      if (stepsRemaining > 0) {
        currentStep = (currentStep + 1) % monopolyLocations.length;
        setPlayerLocation(currentStep);

        stepsRemaining--;
        setTimeout(movePlayer, 1000);
      } else {
        setRolling(false);
      }
    };

    movePlayer();
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWltaW8iLCJhIjoiY2l6ZjJoenBvMDA4eDJxbWVkd2IzZjR0ZCJ9.ppwGNP_-LS2K4jUvgXG2pA";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: monopolyLocations[playerLocation].coordinates,
      zoom: 16.5,
      pitch: 40,
      bearing: 53,
      style: "mapbox://styles/mapbox/standard",
      minZoom: 15,
      maxZoom: 17,
    });

    mapRef.current.on("load", () => {
      mapRef.current.setConfigProperty("basemap", "lightPreset", "dusk");

      mapRef.current.setConfigProperty("basemap", "showPlaceLabels", false);
      mapRef.current.setConfigProperty(
        "basemap",
        "showPointOfInterestLabels",
        false
      );
      mapRef.current.setLayoutProperty("poi-label", "visibility", "none");
    });

    playerMarkerRef.current = new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat(monopolyLocations[playerLocation].coordinates)
      .addTo(mapRef.current);

    monopolyLocations.forEach((location, index) => {
      const marker = new mapboxgl.Marker({
        element: createCustomMarkerElement(location.type),
      })
        .setLngLat(location.coordinates)
        .addTo(mapRef.current);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h3 style="cursor:pointer; color:blue;" id="location-${location.name}">
            ${location.name}
          </h3>
          <p>${location.details}</p>
        `);

      marker.setPopup(popup);
      marker.getElement().addEventListener("click", () => {
        marker.togglePopup();
        navigate(`/location/${location.name}`, {
          state: { location },
        });
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (playerMarkerRef.current) {
      playerMarkerRef.current.setLngLat(
        monopolyLocations[playerLocation].coordinates
      );
    }
  }, [playerLocation]);

  const createCustomMarkerElement = (placeType) => {
    const markerElement = document.createElement("div");
    markerElement.style.width = "30px";
    markerElement.style.height = "30px";
    markerElement.style.backgroundSize = "cover";

    const icons = {
      loc: "/images/club.png",
    };

    const iconUrl = icons[placeType] || "/images/club.png";

    markerElement.style.backgroundImage = `url('${iconUrl}')`;

    return markerElement;
  };

  const handleLoanAccept = async () => {
    setIsLoading(true);
    try {
      const Reqbody = {
        model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
        messages: [
          {
            role: "user",
            content:
              "Player visits bank and requests loan, the loan amount is max of 500, the player has 2 properties and can fetch rent upto 250, how much loan can the bank give. Give me integer value only no text",
          },
        ],
      };

      const response = await fetch(
        "https://dev.beyondnetwork.xyz/api/chat/completions",
        {
          method: "POST",
          headers: {
            "x-api-key": "7b4a2c8e-5678-8765-9d2f-1a3b5c7e9d8f",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Reqbody),
        }
      );

      if (!response.ok) {
        throw new Error("Loan application failed");
      }

      const data = await response.json();
      console.log(data.id);
      if (data && data.choices && data.choices[0]?.message?.content) {
        setLoanAmt(data.choices[0]?.message?.content);
        setShowLoanCard(true);
      }
    } catch (error) {
      console.error("Loan application error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <GameLoader />}
      <div
        id="map"
        style={{ height: "100vh", width: "100%" }}
        ref={mapContainerRef}
      />
      <div className="absolute top-4 left-5 bg-gradient-to-br from-green-800 to-emerald-900 text-lime-100 p-4 rounded-xl shadow-lg border-2 border-green-500">
        <div className="flex items-center space-x-4">
          <Leaf className="w-10 h-10 text-green-300 animate-bounce" />
          <div className="flex flex-col">
            <code className="text-md font-mono bg-green-900/50 px-3 py-2 rounded-md tracking-wider border border-green-600">
              {address}
            </code>
          </div>
        </div>
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          🎮
        </div>
      </div>

      <div
        className="absolute bottom-10 left-5 
        bg-gradient-to-br from-indigo-800 to-purple-900 
        text-white 
        p-4 
        rounded-xl 
        shadow-2xl 
        border-2 
        border-yellow-500 
        w-1/5 
        h-auto 
        min-h-[150px]
        flex 
        flex-col 
        space-y-4 
        transform 
        transition-all 
        hover:scale-105 
        hover:shadow-3xl"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Coins className="text-yellow-400 animate-bounce" size={32} />
            <h2 className="text-2xl font-bold text-yellow-300 uppercase tracking-wider">
              Balance
            </h2>
          </div>
          <button onClick={readFromContract}>
            <ShieldPlus className="text-green-400 animate-pulse" size={28} />
          </button>
        </div>

        <div className="flex-grow flex items-center justify-center gap-8">
          <div className="bg-indigo-700/50 rounded-lg p-3 w-full text-center relative">
            <button className="absolute top-2 left-2 text-white hover:bg-indigo-600 rounded-full p-1 transition-colors"></button>

            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
              {bal.toLocaleString()}
            </span>
            <span className="block text-sm text-gray-300 mt-1">Game Coins</span>
          </div>

          <div className="bg-indigo-700/50 rounded-lg p-3 w-full text-center relative">
            <button className="absolute top-2 left-2 text-white hover:bg-indigo-600 rounded-full p-1 transition-colors"></button>

            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
              {pos.toLocaleString()}
            </span>
            <span className="block text-sm text-gray-300 mt-1">Position</span>
          </div>
        </div>
      </div>
      {!showMintCard && (
        <div
          className="explore"
          style={{
            position: "absolute",
            bottom: "40px",
            right: "20px",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          Next Chance In: {Math.floor(remainingTime / 60)}:
          {String(remainingTime % 60).padStart(2, "0")}
        </div>
      )}
      {showMintCard && (
        <div
          className="explore"
          style={{
            position: "absolute",
            bottom: "40px",
            right: "20px",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "16px",
          }}
          onClick={handleMintCardClick}
        >
          MAKE MOVE
        </div>
      )}
      {showCardDetails && (
        <div
          style={{
            position: "absolute",
            bottom: "450px",
            right: "250px",
          }}
        >
          <div
            style={{ backgroundImage: `url(${card.image})` }}
            className="bg-cover bg-center w-60 h-80 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow absolute"
          >
            <div className="absolute bottom-0 left-0 w-full bg-opacity-60 p-3 rounded-b-3xl">
              <p className="font-extrabold text-white">{card.name}</p>
              <p className="text-neutral-300">{card.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
