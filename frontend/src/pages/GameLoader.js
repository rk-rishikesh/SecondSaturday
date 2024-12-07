import React from "react";
import { Gamepad2, Zap } from "lucide-react";

const GameLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-yellow-200 overflow-hidden">
      <div className="relative w-80 h-80 flex items-center justify-center">
        <div className="absolute inset-0 bg-yellow animate-pulse rounded-full blur-2xl"></div>
        <img className="w-96 rounded-full" src="https://i.gifer.com/origin/19/197c7313cb5bdbf6ab30ebd78bcd106f_w200.gif" />
      </div>
    </div>
  );
};

export default GameLoader;
