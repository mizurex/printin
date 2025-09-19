"use client";

import { useState } from "react";
import { Merriweather } from "next/font/google";
import { useOrderStore } from "@/lib/store";
import Footer from "../Footer";


const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});



export default function PrintOptions() {
  const { orderData, setOrderData, nextStep, prevStep } = useOrderStore();
  const [subStep, setSubStep] = useState(1);

  const nextSubStep = () => {
    if (subStep < 4) {
      setSubStep(subStep + 1);
    } else {
      nextStep();
    }
  };

  const prevSubStep = () => {
    if (subStep > 1) {
      setSubStep(subStep - 1);
    } else {
      prevStep();
    }
  };

  return (
    <div className="bg-[#f2fbfa] min-h-screen py-14">
        <div className="text-black px-4">
        <div className="flex justify-center">
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-gray-700 ${heading.className}`}
          >
            What can we do for your printing?
          </h2>
        </div>
        <div className="flex justify-center text-lg sm:text-xl text-gray-600 font-bold ">
          <p>Select printing options</p>
        </div>
      </div>

   
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 justify-center items-center mt-10 px-4">
        <span
          className={
            Number(subStep) >= 1 ? "text-[#026766] font-bold" : "text-gray-500"
          }
        >
          Colour
        </span>
        <span
          className={`text-2xl ${
            Number(subStep) >= 2 ? "text-[#026766]" : "text-gray-400"
          }`}
        >
          —
        </span>
        <span
          className={
            Number(subStep) >= 2 ? "text-[#026766] font-bold" : "text-gray-500"
          }
        >
          Sides
        </span>
        <span
          className={`text-2xl ${
            Number(subStep) >= 3 ? "text-[#026766]" : "text-gray-400"
          }`}
        >
          —
        </span>
        <span
          className={
            Number(subStep) >= 3 ? "text-[#026766] font-bold" : "text-gray-500"
          }
        >
          Binding
        </span>
        <span
          className={`text-2xl ${
            Number(subStep) >= 4 ? "text-[#026766]" : "text-gray-400"
          }`}
        >
          —
        </span>
        <span
          className={
            Number(subStep) >= 4 ? "text-[#026766] font-bold" : "text-gray-500"
          }
        >
          Lamination
        </span>
      </div>

      {subStep === 1 && (
  <div className="flex flex-col sm:flex-row gap-6 mb-6 justify-center items-center mt-10 px-4">
    {[
      { label: "Black & White", defaultImg: "/blackandwhite.png" },
      { label: "Colour", defaultImg: "/color_1.png" },
    ].map((opt) => {
      const isSelected = orderData.options.colour === opt.label;
      return (
        <button
          key={opt.label}
          className="p-4 w-full max-w-sm h-48 flex flex-col items-center cursor-pointer justify-center rounded-md shadow-lg border bg-white hover:bg-gray-50 transition-colors"
          onClick={() =>
            setOrderData({
              ...orderData,
              options: { ...orderData.options, colour: opt.label },
            })
          }
        >
          <img
            src={opt.defaultImg}
            alt={opt.label}
            className="w-24 h-20 mb-2 object-contain"
          />
          <span className="font-semibold text-gray-700 mb-2">
            {opt.label}
          </span>
          <input
            type="checkbox"
            checked={isSelected}
            readOnly
            className="w-5 h-5 accent-[#026766]"
          />
        </button>
      );
    })}
  </div>
)}


      {subStep === 2 && (
        <div className="flex flex-col sm:flex-row gap-6 mb-6 justify-center items-center mt-10 px-4">
          {[
            { label: "Single-Sided", defaultImg: "/singleside.png" },
            { label: "Double-Sided", defaultImg: "/double.png" },
          ].map((opt) => {
            const isSelected = orderData.options.sides === opt.label;
            return(
                <button
              key={opt.label}
              className="p-4 w-full max-w-sm h-48 flex flex-col items-center cursor-pointer justify-center rounded-md shadow-lg border bg-white hover:bg-gray-50 transition-colors"
              onClick={() =>
                setOrderData({
                  ...orderData,
                  options: { ...orderData.options, sides: opt.label },
                })
              }
            >
              <img src={opt.defaultImg} alt={opt.label} className="w-24 h-20 mb-2 object-contain" />
              <span className="font-semibold text-gray-700 mb-2">
                {opt.label}
              </span>
              <input
                type="checkbox"
                checked={isSelected}
                readOnly
                className="w-5 h-5 accent-[#026766]"
              />
            </button>
            )
           
        })}
        </div>
      )}

      {subStep === 3 && (
        <div className="flex flex-col sm:flex-row gap-6 mb-6 justify-center mt-10 px-4">
          {[
            { label: "None", defaultImg: "/nobind.png" },
            { label: "Binding", defaultImg: "/binding.png" },
          ].map((opt) => {
            const isSelected = orderData.options.binding === opt.label;
            return(
            <button
              key={opt.label}
              className="p-4 w-full max-w-sm h-48 flex flex-col items-center cursor-pointer justify-center rounded-md shadow-lg border bg-white hover:bg-gray-50 transition-colors"
              onClick={() =>
                setOrderData({
                  ...orderData,
                  options: { ...orderData.options, binding: opt.label },
                })
              }
            >
              <img src={opt.defaultImg} alt={opt.label} className="w-24 h-20 mb-2 object-contain" />
              <span className="font-semibold text-gray-700 mb-2">
                {opt.label}
              </span>
              <input
                type="checkbox"
                checked={isSelected}
                readOnly
                className="w-5 h-5 accent-[#026766]"
              />
            </button>

            )
            
            })}
        </div>
      )}

      {subStep === 4 && (
        <div className="flex flex-col sm:flex-row gap-6 mb-6 justify-center mt-10 items-center px-4">
          {[
            { label: "None", defaultImg: "/nolami.png" },
            { label: "Lamination", defaultImg: "/lamination.png" },
          ].map((opt) => {
            const isSelected = orderData.options.lamination === opt.label;
            return(
                 <button
              key={opt.label}
              className="p-4 w-full max-w-sm h-48 flex flex-col items-center cursor-pointer justify-center rounded-md shadow-lg border bg-white hover:bg-gray-50 transition-colors"
              onClick={() =>
                setOrderData({
                  ...orderData,
                  options: { ...orderData.options, lamination: opt.label },
                })
              }
            >
              <img src={opt.defaultImg} alt={opt.label} className="w-24 h-20 mb-2 object-contain" />
              <span className="font-semibold text-gray-700 mb-2">
                {opt.label}
              </span>
              <input
                type="checkbox"
                checked={isSelected}
                readOnly
                className="w-5 h-5 accent-[#026766]"
              />
            </button>
            )
           
        })}
        </div>
      )}

     <div className="flex justify-center px-4">
  <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-4 border">
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
      <div
        className="h-2 bg-[#026766] rounded-full transition-all duration-500 ease-in-out"
        style={{
          width: `${(subStep / 4) * 100}%`, 
        }}
      />
    </div>
    
    <div className="flex flex-wrap gap-2 sm:gap-4 text-sm sm:text-base text-gray-500 font-semibold">
      <span
        className={`${
          subStep === 1 ? "text-black font-bold" : orderData.options.colour ? "text-black" : "text-gray-400"
        }`}
      >
        {orderData.options.colour ? `✔ ${orderData.options.colour}` : "Black & White"}
      </span>
       <span
        className={`${
          subStep === 2 ? "text-black font-bold" : orderData.options.sides ? "text-black" : "text-gray-400"
        }`}
      >
       {subStep >=2 ? `✔ ${orderData.options.sides}` : ""}
      </span>

      <span
        className={`${
          subStep === 2 ? "text-black font-bold" : orderData.options.binding? "text-black" : "text-gray-600"
        }`}
      >
        {subStep >= 3 ? `✔ ${orderData.options.binding}` : ""}
      </span>
      <span
        className={`${
          subStep === 4 ? "text-black font-bold" : orderData.options.lamination ? "text-black" : "text-gray-400"
        }`}
      >
        {subStep >= 4 ? `✔ ${orderData.options.lamination}` : ""}
      </span>
     
    </div>
  </div>
</div>


      {/* Navigation */}
      <div className="flex gap-4 mt-8 justify-center">
        <button
          onClick={prevSubStep}
          className="px-6 py-3 font-bold cursor-pointer text-gray-500"
        >
          Back
        </button>

        {subStep < 4 ? (
            <button
          onClick={nextSubStep}
          className="px-15 py-3 bg-[#026766] text-white font-semibold rounded-lg shadow cursor-pointer hover:bg-[#027876]"
        >
         CONTINUE
        </button> 
        ):(
         <button
          onClick={nextSubStep}
          className="px-16 py-3 bg-[#026766] text-white font-semibold rounded-lg shadow cursor-pointer hover:bg-[#027876]"
        >
        NEXT
        </button>
           
        )}
      </div>
      <div className="mt-20">
          <Footer/>
      </div>
    
    </div>
  );
}
