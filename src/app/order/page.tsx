"use client";
import { useState } from "react";
import OrderStepper from "@/components/order/OrderStepper";
import FileUpload from "@/components/order/FileUpload";
import PrintOptions from "@/components/order/PrintOptions";
import ServiceOptions from "@/components/order/ServiceOptions";
import Checkout from "@/components/order/Checkout";
import OrderNav from "@/components/order/OrderNav";

export default function OrderPage() {
  const [step, setStep] = useState(1);

  // Store order data across steps
 const [orderData, setOrderData] = useState({
  files: [],
  options: {
    colour: "Black & White",
    sides: "Single-Sided",
    binding: "None",
    lamination:"None",
  },
  service: {
    method: "delivery", 
    delivery: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    pickup: {
      selected: false,
      storeId: null,
      storeAddress: "",
    },
    date: new Date().toISOString().split("T")[0],
  },
  copies: 1,
});


  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 ">
      <OrderNav step={step}/>
      <div className="  bg-white ">
       

        {step === 1 && (
          <FileUpload
            orderData={orderData}
            setOrderData={setOrderData}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <PrintOptions
            orderData={orderData}
            setOrderData={setOrderData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <ServiceOptions
            orderData={orderData}
            setOrderData={setOrderData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 4 && (
          <Checkout
            orderData={orderData}
           
          />
        )}
      </div>
    </div>
  );
}
