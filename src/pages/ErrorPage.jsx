import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import loadingAnimation from "../components/error.json";

const ErrorPage = () => {
  return (
    <div className="w-full h-lvh flex items-center md:justify-normal justify-center  bg-white flex-col z-50">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        className="w-2/4 "
      />
      <div className="">
      <Link to="/">
   <button className="bg-white cursor-pointer text-green py-3 px-10 md:text-3xl text-xl font-bold rounded-tl-full rounded-br-full border-4 border-green bg-white md:mt-4 mt-2 ">
             Back to Home
            </button>
      </Link>

      </div>
    </div>
  );
};

export default ErrorPage;
