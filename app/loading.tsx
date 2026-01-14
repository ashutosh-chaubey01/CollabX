import React from "react";

function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <video
        className="h-[100px] w-[100px]"
        autoPlay
        loop
        src="/assets/videos/loading.gif"></video>
    </div>
  );
}

export default Loading;
