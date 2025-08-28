"use client";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import MovingCards from "./ui/MovingCards";
import { motion } from "motion/react";
import Footer from "./Footer";
import TestimonialCard from "./MovingCards";
import { Merriweather } from "next/font/google";


const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

const Map = dynamic(() => import("../components/Map"), { ssr: false });
export default function Hero() {
    const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [options, setOptions] = useState({
    color: true,
    doubleSided: true,
    binding: false,
    lamination: false,
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
    <main>
        <section className="relative w-full min-h-[90vh] overflow-hidden">
      {/* mobile img */}
      <Image
        src="/hero.jpg"           
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
            
            <h1 className={`max-w-4xl text-3xl md:text-3xl font-extrabold tracking-tight mt-25 text-gray-700 ${heading.className}`}>
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
                    <span className="text-sm text-black">Selected</span>
                    <span className="h-4 w-4  bg-black text-white" > 
                      ^ </span>
                  </span>
                </div>
              </div>
             
              <div className=" bg-white shadow-xl p-10 border border-t opacity-80">
                <div className="text-2xl font-semibold text-black">A3 Printing</div>
                <div className="mt-4 text-black">Coming soon</div>
              </div>
            </div>

          
            <button className="mt-20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center rounded-xl bg-[#026766] px-8 py-4 text-white font-semibold shadow-lg cursor-pointer active:scale-[.99]">
              ORDER NOW
            </button>
          </div>
        </div>
      </div>
    </section>

     <section className="bg-white text-gray-700 py-12  ">
      <div className="text-center mb-8">
        <h3 className={`text-4xl font-bold text-gray-800 ${heading.className}`}>Get Instant Quote</h3>
        <p className="text-xl font-light mt-2">
          Upload your document & choose your printing options to get an instant
          quote.
        </p>
      </div>
      <div className="flex items-center px-55">

        <div className="border  shadow-xl p-10 flex flex-col lg:flex-row gap-12 w-[70vw] ">
        {/* Left: Product + Upload */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-semibold">Product</h2>

          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span>A4 Printing</span>
              <input type="checkbox" checked readOnly />
            </label>
            <label className="flex items-center justify-between text-gray-400">
              <span>A3 Printing (coming soon)</span>
              <input type="checkbox" disabled />
            </label>
          </div>

          {/* Drag and Drop */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
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
                <p className="text-green-600">{file.name}</p>
              ) : (
                <p>Drag and drop your files here or <span className="text-blue-500 underline">browse</span></p>
              )}
            </label>
          </div>
        </div>

        {/* Right: Printing Options */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-semibold">Printing Options</h2>

          {Object.entries(options).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="capitalize">{key}</span>
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  setOptions((prev) => ({ ...prev, [key]: !prev[key as keyof typeof options] }))
                }
                className="toggle accent-green-600"
              />
            </div>
          ))}

          {/* Copies Input */}
          <div className="flex items-center justify-between">
            <span>Copies</span>
            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
              className="w-20 border rounded px-2 py-1 text-center"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Get Quote
          </button>
        </div>
      </div>
      </div>
      
    </section>
    <section className="bg-white text-black mt-3.5">
        <div>
            <div>
                <div className="flex justify-center">
                    <h2 className={`text-3xl  font-bold text-gray-800 ${heading.className}`}> 
                        Instant Printing Near Me
                    </h2>
                </div>
                <div className="flex justify-center">
                    <span className="font-light text-xl">
                        Choose delivery to your door, or collect from over 400 convenient locations nationwide.
                    </span>
                </div>
            </div>
            <div className="flex justify-center">
                <img src="/shop2.png" alt=""  className="w-[50vw]"/>
            </div>
        </div>
    </section>
   <section className="bg-white text-black mt-6 py-8">
  <h1 className={`text-center text-3xl font-bold my-6 ${heading.className}`}>
    Explore Collect Locations
  </h1>
  <span className="flex justify-center text-xl font-bold text-gray-500">find the nearest Click & Check Price </span>
  <div className="mx-auto w-[80vw] h-[60vh] flex justify-center items-center  overflow-hidden ">
    <Map />
  </div>
</section>

<section className="bg-white text-black">
    <div>
        <div className="flex justify-center">
            <h4 className={`text-3xl text-gray-800 font-bold ${heading.className}`}>Proudly serving over 675,000 happy customers since 2014</h4>
        </div>
        <div className="flex justify-center">
            <p className="text-xl font-extralight text-gray-600">
                We think our print services are awesome. But don't take our word for it
            </p>
        </div>
        <div className="text-xl items-center text-center font-extralight text-gray-600">
            <h2>
                Trustpilot reviews
            </h2>

            <span>
                (more than 724 reviews)
            </span>
        </div>
    </div>
    <div>
       <TestimonialCard />
    </div>
</section>

<section className="bg-[#f9f9f9] text-black py-10 px-16 h-[40vh]">
    <div className="flex justify-center">
        <h4 className={`${heading.className} text-3xl font-bold text-gray-800`}>
            A complete solution for your team's printing
        </h4>
    </div>
    <div className="flex justify-center mt-3.5">
        <p className="text-xl text-gray-500">
            We’ve helped 400,000+ businesses and individuals with their everyday printing. Whether your team needs just a few pages or a few thousand, we’ll securely ship from our facilities to any UK address in a matter of one working day.
        </p>
    </div>
    <div className="flex justify-center mt-10">
         <button className="transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center rounded-xl bg-[#026766] px-8 py-4 text-white font-semibold shadow-lg cursor-pointer active:scale-[.99]">
              SignUp Now
          </button>
    </div>
</section>

<section className="bg-white text-black relative">
  <div className="text-center py-6">
    <h2 className={`${heading.className} text-3xl font-bold text-gray-800`}>We Print Responsibly</h2>
  </div>

  <div className="relative w-full h-[100vh]">
    <img
      src="/doggy2.png"
      alt="Sustainability"
      className="w-full h-full object-cover"
    />
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-start justify-center w-full">
      <p className="text-xl md:text-2xl text-gray-600 font-extralight max-w-3xl text-center px-4">
      We're committed to making your printing sustainable. To do this, we
      always give back more than we take. For every 5,000 pages we print, we
      plant a tree, which provides paper for 8,500 new pages and absorbs 48
      pounds of CO2 per year.
      </p>
    </div>
  </div>
</section>




<section className="bg-white px-20 text-black py-20">
    <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="flex-1">
            <img src="/copy.png" alt="Document Printing" className="w-full h-auto rounded-lg shadow-lg" />
        </div>

        {/* Text Section */}
        <div className="flex-1 space-y-6">
            <h2 className={`${heading.className} text-3xl font-bold text-gray-800`}>
                Why choose document printing near me from Printt?
            </h2>
            <p className="text-lg leading-relaxed">
                Do you have countless documents to print but no time to go to the copy studio and queue up? Or are there so many pages that carrying them around easily is impossible and you run the risk of crumpling them up and looking unprofessional?
            </p>
            <p className="text-lg leading-relaxed">
                And if it's cold outside and you just don't feel like going out? That's where we at Printt come to the rescue! When you ask yourself "Is there printing near me?", we are the answer! We'll print the documents you need and deliver them to your door. You don't even need to leave the house. You have the time to finish the urgent tasks while we print the documents. All you need to do is upload the files to your account and we'll do the rest.
            </p>
            <p className="text-lg leading-relaxed">
                Delivery happens within the business day so you're prepared for important meetings without worrying about printer near me. The information in the documents is completely protected and only you have access to it. The files are stored securely in your account so you can print them when you need them.
            </p>
        </div>
    </div>
</section> 
<section className="bg-white px-30 py-10">
          <div className="flex justify-center">
            <h3 className={`${heading.className} text-3xl text-gray-800`}>Common questions about Printt</h3>
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
                <div className="collapse-title font-semibold text-black">
                    {faq.title}
                </div>
                <div className="collapse-content text-sm text-gray-700">
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
