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
      <Image
        src="/mobile-hero.jpg"           
        alt="mobile hero"
        fill
        priority
        quality={100}
        className="object-cover md:hidden"
      />
        <Image
        src="/hero_sec.png"
        alt="deskstop hero"
        fill
        priority
        quality={100}
        className="object-cover hidden md:block"
      />

     
      <div className="absolute inset-0 bg-black/5 md:bg-black/0" />

    
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center py-16 md:py-24">
            
            <h1 className={`max-w-6xl md:text-4xl text-400px text-3xl font-extrabold tracking-tight mt-15 text-neutral-700 ${heading.className}`}>
              Document Printing Made Quick And Easy Near You
            </h1>

          
            <p className="mt-3 max-w-2xl text-base md:text-xl text-gray-700">
              On-demand A4 printing with next-day delivery or seamless click-and-collect
            </p>

            
        

            <Link href="/order">

             <motion.button 
               whileHover={{ 
                 y: -2, 
                 scale: 1.02,
                 transition: { duration: 0.1, ease: "easeOut" }
               }}
               whileTap={{ 
                 scale: 0.98,
                 transition: { duration: 0.05 }
               }}
               className="mt-20 inline-flex items-center justify-center rounded-lg bg-brand hover:bg-brand/80 px-6 py-3 text-white font-medium shadow-md hover:shadow-lg transition-all duration-100 cursor-pointer"
             >
              ORDER NOW
            </motion.button>
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
            key={key} 
            className="flex justify-between cursor-pointer items-center py-3 sm:py-4 border border-gray-100 shadow-lg rounded-lg p-4 sm:p-5 bg-white"
            onClick={() =>
              setOptions((prev) => ({ ...prev, [key]: !prev[key as keyof typeof options] }))
            }>
              <span className="capitalize text-sm lg:text-lg font-bold text-gray-700">{key}</span>
              <div className="relative">
                <div className={`w-12 h-6 rounded-full transition-all duration-300 ${value ? 'bg-[#026766]' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 transform ${value ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </motion.div>
          ))}

         
        
        </div>

      
        <motion.button
          onClick={handleSubmit}
          className="w-full bg-[#026766] from-green-600 to-green-700 cursor-pointer text-white py-2 sm:py-3 lg:py-3 rounded-lg shadow-md hover:shadow-lg transition-all text-white sm:text-base lg:text-lg font-medium mt-6 sm:mt-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Instant Quote
        </motion.button>
      </div>
    </div>
  </div>
</section>
    <section className="bg-[#f8f8f7] text-black py-8 sm:py-10 px-4 sm:px-8 md:px-16 relative">
        <div>
            <div>
                <div className="flex justify-center">
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 text-center ${heading.className}`}> 
                        Instant Printing Near Me
                    </h2>
                </div>
                <div className="flex justify-center mt-3 sm:mt-4">
                    <span className="font-light text-sm sm:text-lg md:text-xl text-center px-2">
                        Choose delivery to your door, or collect from over 400 convenient locations nationwide.
                    </span>
                </div>
            </div>
            <div className="flex justify-center relative w-full h-64 sm:h-80 md:h-96 mt-6 sm:mt-8">
         
                <Image
                priority
                quality={100}
                fill
                src="/store_final.svg" 
                alt="md screen"
                className="object-contain scale-90 sm:scale-100 md:scale-110"
                />
            </div>
        </div>
  </section>

   <section className="bg-white text-black mt-6 py-10">
  <h1 className={`text-center text-gray-700 text-4xl font-bold mb-6 pb-10 ${heading.className}`}>
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
        
        <p className="md:text-lg text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            We've helped thousands of businesses and individuals with their everyday printing. Whether your team needs just a few pages or a few thousand, we'll securely ship from our facilities to any India address in a matter of one working day.
        </p>
        <div className="pt-4">
            <Link href="/order">
             <motion.button 
               whileHover={{ 
                 y: -2, 
                 scale: 1.02,
                 transition: { duration: 0.1, ease: "easeOut" }
               }}
               whileTap={{ 
                 scale: 0.98,
                 transition: { duration: 0.05 }
               }}
               className="inline-flex items-center justify-center rounded-lg bg-brand hover:bg-brand/80 px-6 py-3 text-white font-medium shadow-md hover:shadow-lg transition-all duration-100 cursor-pointer"
             >
               SignUp Now
             </motion.button>
            </Link>
        </div>
    </div>
</section>

<section className="bg-white text-black relative">
  <div className="text-center py-6 pt-10">
    <h2 className={`${heading.className} text-3xl font-medium text-gray-700`}>We Print Responsibly</h2>
  </div>

  <div className="relative w-full h-[100vh]">
    <img
      src="/raccon.png"
      alt="Sustainability"
      className="w-full h-full object-cover hidden md:block"
    />
    <img src="/raccon.png" alt="" className="w-[100vw] mx-auto h-full object-cover md:hidden" />
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-start justify-center w-full">
      <p className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl text-center px-4">
      We're committed to making your printing sustainable.For every 100 page we print, we
      plant a tree.
      </p>
    </div>
  </div>
</section>



<section className=" px-8 md:px-20 text-black py-20">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className={`text-2xl md:text-4xl font-bold text-gray-800 ${heading.className}`}>
        Why Choose Us?
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Card 1 */}
      <div className=" p-6 rounded-xl bg-neutral-100 border-t-3 border-brand text-center">
        <div className="flex justify-center mb-4">
          <svg className="w-10 h-10 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"/>
          </svg>
        </div>
        <h3 className="font-bold text-lg mb-2">Fast Turn Around</h3>
        <p className="text-gray-600">Same-day order delivery for small orders.</p>
      </div>

      {/* Card 2 */}
      <div className=" p-6 rounded-xl bg-neutral-100 border-t-3 border-brand text-center">
        <div className="flex justify-center mb-4">
          <svg className="w-10 h-10 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2l1.5 4.5h9L18 2M3 6h18M4 6v14a2 2 0 002 2h12a2 2 0 002-2V6"/>
          </svg>
        </div>
        <h3 className="font-bold text-lg mb-2">Easy Ordering</h3>
        <p className="text-gray-600">  Pickup or get delivery. Reorder in a click – ideal for businesses!</p>
      </div>

      {/* Card 3 */}
      <div className=" p-6 rounded-xl bg-neutral-100 border-t-3 border-brand text-center">
        <div className="flex justify-center mb-4">
          <svg className="w-10 h-10 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 7h16v13H4zM4 3h16v4H4z"/>
          </svg>
        </div>
        <h3 className="font-bold text-lg mb-2">27+ Stores Nationwide</h3>
        <p className="text-gray-600">Quality Printing, always within reach!</p>
      </div>

      {/* Card 4 */}
      <div className=" p-6 rounded-xl bg-neutral-100 border-t-3 border-brand text-center">
        <div className="flex justify-center mb-4">
          <svg className="w-10 h-10 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4zM4 4l8 8 8-8"/>
          </svg>
        </div>
        <h3 className="font-bold text-lg mb-2">Wide Product Range</h3>
        <p className="text-gray-600">From tees to trophies – We print it all.</p>
      </div>
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
