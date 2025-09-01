"use client";
import Image from "next/image";
import { useState } from "react";

import { motion } from "motion/react";
import Footer from "./Footer";
import TestimonialCard from "./MovingCards";
import { Merriweather } from "next/font/google";

import { BiHappyHeartEyes } from "react-icons/bi";
import Link from "next/link";
import PriceMap from "./map/Map";


const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], 
});



export default function Hero() {
    const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [options, setOptions] = useState({
    color: true,
    doubleSided: true,
    binding: true,
    lamination: true,
  });
  const [copies, setCopies] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a file first");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("options", JSON.stringify(options));
    formData.append("copies", copies.toString());

    // send to your backend API
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    alert("File uploaded successfully!");
  };
  return (
    <main className="bg-white overflow-hidden">
        <section className="relative w-full min-h-[90vh] overflow-hidden">
      {/* mobile img */}
      <Image
        src="/mobile-hero.jpg"           
        alt="City street background with courier and customers"
        fill
        priority
        quality={100}
        className="object-cover md:hidden"
      />
        <Image
        src="/upscale.jpg"
        alt="Hero background for mobile"
        fill
        priority
         className="object-cover hidden md:block"
      />

     
      <div className="absolute inset-0 bg-black/5 md:bg-black/0" />

    
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center py-16 md:py-24">
            
            <h1 className={`max-w-6xl md:text-4xl  text-3xl font-extrabold tracking-tight mt-25 text-gray-700 ${heading.className}`}>
              Document Printing Made Quick And Easy Near You
            </h1>

          
            <p className="mt-3 max-w-2xl text-base md:text-xl text-gray-700">
              On-demand A4 printing with next-day delivery or seamless click-and-collect
            </p>

            
            <div className="mt-10 grid w-[40p] max-w-xl grid-cols-1 gap-6 sm:grid-cols-2">
              <div className=" bg-white shadow-xl p-10 border border-t">
                <div className="text-2xl text-black font-semibold">A4 Printing</div>
                <div className="mt-4 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 border px-3 py-1">
                    <div className="w-6 h-6 bg-[#026766] rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-black">Selected</span>
                  </span>
                </div>
              </div>
             
              <div className=" bg-white shadow-xl p-10 border border-t opacity-80">
                <div className="text-2xl font-semibold text-black">A3 Printing</div>
                <div className="mt-4 text-black">Coming soon</div>
              </div>
            </div>

            <Link href="/order">

             <button className="mt-20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center rounded-xl bg-[#026766] px-8 py-4 text-white font-semibold shadow-lg cursor-pointer active:scale-[.99]">
              ORDER NOW
            </button>
            </Link>
           
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white text-gray-700 py-8 sm:py-12">
  <div className="text-center mb-6 sm:mb-8 px-4">
    <h3 className={`${heading.className} text-3xl sm:text-3xl lg:text-4xl font-bold text-gray-700`}>
      Get Instant Quote
    </h3>
    <p className="text-base sm:text-lg lg:text-xl font-light mt-2 max-w-2xl mx-auto">
      Upload your document & choose your printing options to get an instant quote.
    </p>
  </div>
  
  <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="shadow-xl rounded-lg p-4 sm:p-6 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10">
      
     
      <div className="flex-1 space-y-4 sm:space-y-6 min-w-0">
        <h2 className="text-xl sm:text-2xl font-semibold">Product</h2>

        <motion.div 
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          className="space-y-2 shadow-lg rounded-lg p-4 sm:p-5 cursor-pointer"
        >
          <label className="flex items-center justify-between">
            <span className="text-sm sm:text-base lg:text-lg">A4 Printing</span>
            <input type="checkbox" checked readOnly className="toggle accent-green-600 scale-110 sm:scale-125" />
          </label>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          className="flex justify-between items-center shadow-lg rounded-lg p-4 sm:p-5 cursor-not-allowed bg-gray-50"
        >
          <span className="text-sm sm:text-base lg:text-lg text-gray-400">A3 Printing (coming soon)</span>
        </motion.div>

       
        <div
          className={`border-2 border-dashed rounded-lg p-6 sm:p-8 lg:p-10 text-center cursor-pointer transition-all min-h-[120px] sm:min-h-[150px] ${
            dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            {file ? (
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl lg:text-5xl">📄</div>
                <p className="text-green-600 text-sm sm:text-base lg:text-lg font-medium break-all">{file.name}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-3xl sm:text-4xl lg:text-5xl">📁</div>
                <p className="text-sm sm:text-base lg:text-lg">
                  Drag and drop your files here or{" "}
                  <span className="text-blue-500 underline font-medium">browse</span>
                </p>
              </div>
            )}
          </label>
        </div>
      </div>

     
      <div className="flex-1 space-y-4 sm:space-y-6 min-w-0">
        <h2 className="text-xl sm:text-2xl font-semibold">Printing Options</h2>

        <div className="space-y-4">
          {Object.entries(options).map(([key, value]) => (
            <motion.div 
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            key={key} className={`flex justify-between cursor-pointer  items-center py-3 ${value ? "bg-white text-black " : "bg-[#f9f9f9] opacity-80 text-gray-400"} sm:py-4 border border-gray-100 shadow-lg rounded-lg p-4 sm:p-5 last:border-b-0`}>
              <span className="capitalize text-sm  lg:text-lg font-bold capitalize">{key}</span>
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  setOptions((prev) => ({ ...prev, [key]: !prev[key as keyof typeof options] }))
                }
                className="toggle  scale-110 sm:scale-125 border border-gray-500 rounded-full"
              />
            </motion.div>
          ))}

         
          <div className="flex items-center justify-between py-3 sm:py-4">
            <span className="text-sm sm:text-base lg:text-lg font-medium">Copies</span>
            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) =>{
                if(Number(e.target.value) > 10){
                  setCopies(prev=>prev)
                }
                else{
                    setCopies(Number(e.target.value))
                  }
                }
                
              }
              className="w-16 sm:w-20 lg:w-24 border border-gray-300 rounded-lg px-2 sm:px-3 py-2 sm:py-3 text-center text-sm sm:text-base lg:text-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

      
        <motion.button
          onClick={handleSubmit}
          className="w-full bg-[#026766] from-green-600 to-green-700 cursor-pointer text-white py-3 sm:py-4 lg:py-5 rounded-xl shadow-lg hover:shadow-xl transition-all text-white sm:text-lg lg:text-xl font-semibold mt-6 sm:mt-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Instant Quote
        </motion.button>
      </div>
    </div>
  </div>
</section>

    <section className="bg-[#f8f8f7] text-black py-10 px-16 relative">
        <div>
            <div>
                <div className="flex justify-center">
                    <h2 className={`text-4xl  font-bold text-gray-700 ${heading.className}`}> 
                        Instant Printing Near Me
                    </h2>
                </div>
                <div className="flex justify-center mt-4">
                    <span className="font-light text-xl">
                        Choose delivery to your door, or collect from over 400 convenient locations nationwide.
                    </span>
                </div>
            </div>
            <div className="flex justify-center relative w-full h-96 mt-8">
             <h2>check</h2>
                <Image
                priority
                quality={100}
                fill
                src="/store_final.svg" 
                alt="md screen"
                className="object-contain scale-110"
                />
            </div>
        </div>
    </section>

   <section className="bg-white text-black mt-6 py-10">
  <h1 className={`text-center text-gray-700 text-4xl font-bold my-6 ${heading.className}`}>
    Explore Collect Locations
  </h1>
  <span className="flex justify-center text-xl font-bold text-gray-500">find the nearest Click & Check Price </span>
  <div className="mx-auto w-[90vw] h-fit md:w-[80vw] md:h-[70vh] flex justify-center items-center shadow-md">
  <PriceMap />
</div>
</section>

<section className="bg-white text-black py-10">
    <div>
        <div className="flex justify-center">
            <h4 className={` md:text-4xl text-3xl text-center text-gray-800 font-bold ${heading.className}`}>Proudly serving over 1000+ happy customers</h4>
        </div>
        <div className="flex justify-center mt-3">
            <p className="md:text-xl text-lg font-bold text-center text-gray-500">
                We think our print services are awesome. But don't take our word for it
            </p>
        </div>
        <div className="text-xl items-center text-center font-bold text-gray-500 mt-5">
            <h2>
                Our Customer Reviews
            </h2>

            <span>
                (more than 694 reviews)
            </span>
        </div>
    </div>
    <div>
       <TestimonialCard />
    </div>
</section>

<section className="bg-[#f9f9f9] text-black py-16 px-4 md:px-16 min-h-[50vh] flex flex-col justify-center">
    <div className="max-w-4xl mx-auto text-center space-y-8">
        <h4 className={`${heading.className} md:text-4xl text-3xl font-bold text-gray-700 leading-tight`}>
            A complete solution for your team's printing
        </h4>
        
        <p className="md:text-xl text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            We've helped 400,000+ businesses and individuals with their everyday printing. Whether your team needs just a few pages or a few thousand, we'll securely ship from our facilities to any UK address in a matter of one working day.
        </p>
        
        <div className="pt-4">
            <button className="transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center rounded-xl bg-[#026766] px-8 py-4 text-white font-semibold shadow-lg cursor-pointer active:scale-[.99]">
                SignUp Now
            </button>
        </div>
    </div>
</section>

<section className="bg-white text-black relative">
  <div className="text-center py-6">
    <h2 className={`${heading.className} text-3xl font-bold text-gray-800`}>We Print Responsibly</h2>
  </div>

  <div className="relative w-full h-[100vh]">
    <img
      src="/doggo_md.svg"
      alt="Sustainability"
      className="w-full h-full object-cover hidden md:block"
    />
    <img src="/doggo.jpeg" alt="" className="w-[100vw] mx-auto h-full object-cover md:hidden" />
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-start justify-center w-full">
      <p className="text-lg md:text-2xl text-black font-bold max-w-3xl text-center px-4">
      We're committed to making your printing sustainable.For every 100 page we print, we
      plant a tree.
      </p>
    </div>
  </div>
</section>




<section className="bg-white px-8 md:px-20 text-black py-20">
    <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`${heading.className} text-3xl md:text-5xl text-center lg:text-left font-bold text-gray-700 leading-tight`}
                >
                    Why choose document printing from Us?
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="md:text-xl text-lg text-center text-gray-500"
                >
                    Do you have countless documents to print but no time to go to the copy studio and queue up? Or are there so many pages that carrying them around easily is impossible and you run the risk of crumpling them up and looking unprofessional?
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#026766] rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Lightning Fast</h3>
                            <p className="text-gray-600 text-sm">Get your documents printed and delivered within 24 hours</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#026766] rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Premium Quality</h3>
                            <p className="text-gray-600 text-sm">Professional-grade printing with crisp, clear results</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#026766] rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Secure Handling</h3>
                            <p className="text-gray-600 text-sm">Your documents are handled with complete confidentiality</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#026766] rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Convenient Locations</h3>
                            <p className="text-gray-600 text-sm">Pick up from multiple locations across the city</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                    <button className="transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center rounded-xl bg-[#026766] px-8 py-4 text-white font-semibold shadow-lg cursor-pointer active:scale-[.99]">
                        Start Printing Now
                    </button>
                    <button className="transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg inline-flex items-center justify-centertext-[#026766] px-8 py-4 font-semibold cursor-pointer active:scale-[.99]">
                        View Pricing
                    </button>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 relative"
            >
                <div className="relative">
                    <img
                        src="/printer3.png"
                        alt="Professional printing services"
                        className=" w-full h-[450px] object-cover"
                    />
                    <div className="absolute -bottom-6 -left-6 bg-white p-2  shadow-lg border">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#f8f8f7]  flex items-center justify-center">
                               <BiHappyHeartEyes/>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">1000+</p>
                                <p className="text-sm text-gray-600">Happy Customers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
</section> 
<section className="bg-white px-10 md:px-30 py-10">
          <div className="flex justify-center">
            <h3 className={`${heading.className} text-2xl md:text-4xl text-center font-bold text-gray-800`}>Common questions about us</h3>
          </div>
    <div className="space-y-4">
        {[
            {
                title: "How do I create an account?",
                content: "Click the 'Sign Up' button in the top right corner and follow the registration process.",
            },
            {
                title: "I forgot my password. What should I do?",
                content: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
            },
            {
                title: "How do I update my profile information?",
                content: "Go to 'My Account' settings and select 'Edit Profile' to make changes.",
            },
            {
                title: "How can I track my order?",
                content: "Once your order is shipped, you will receive a tracking number via email to monitor its status.",
            },
            {
                title: "What payment methods do you accept?",
                content: "We accept all major credit cards, PayPal, and other secure payment methods.",
            },
            {
                title: "Can I cancel or modify my order after placing it?",
                content: "Orders can be modified or canceled within 1 hour of placement by contacting our support team.",
            },
        ].map((faq, index) => (
            <motion.div
                key={index}
                className="collapse collapse-arrow bg-white rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                <div className="collapse-title font-semibold text-black ">
                    {faq.title}
                </div>
                <div className="collapse-content text-sm text-gray-700 ">
                    {faq.content}
                </div>
            </motion.div>
        ))}
    </div>
</section>

        <section>
            <Footer/>
        </section>

    </main>
    
  );
}
