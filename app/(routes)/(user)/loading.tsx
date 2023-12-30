import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="relative flex justify-center items-center">
        <Image
          src="/images/loader.gif"
          alt="ORIC Loading"
          width={100}
          height={100}
        />
        {/* <div className="absolute animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div> */}
      </div>
    </div>
  );
};

export default Loading;
