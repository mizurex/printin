"use client";
import FileUpload from "@/components/order/FileUpload";
import PrintOptions from "@/components/order/PrintOptions";
import ServiceOptions from "@/components/order/ServiceOptions";
import OrderNav from "@/components/order/OrderNav";
import { useOrderStore } from "@/lib/store";


export default function OrderPage() {
  const { step, orderData, setOrderData, nextStep, prevStep } = useOrderStore();


  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="  bg-white ">
       

        {step === 1 && (
          <FileUpload
          
          />
        )}
        {step === 2 && (
          <PrintOptions
       
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
     
      </div>
    </div>
  );
}
