"use client";
import { useState } from "react";
import { Merriweather } from "next/font/google";
import {motion} from "motion/react"
import { BiRightArrow } from "react-icons/bi";
import { useOrderStore } from "@/lib/store";
import Footer from "../Footer";

const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], 
});



export default function FileUpload() {
  const { orderData, setOrderData, nextStep } = useOrderStore();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles); 
  
      const file = selectedFiles[0]; 
      setOrderData({
        ...orderData,
        files: {
          url: URL.createObjectURL(file),
          type: file.type,
        },
      });
    }
  };

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/v1/upload-file", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (json.success) {
        console.log("Cloudinary URL:", json.files[0].secure_url);
        setOrderData({ ...orderData, files:{
          ...orderData.files,
          url:json.files[0].secure_url,
          type:json.files[0].format,
        }});
        nextStep();
      } else {
        alert("Upload failed, please try again");
        setOrderData({ ...orderData, files: { url: "", type: "" } });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading");
      setFiles([]);
      setOrderData({ ...orderData, files: { url: "", type: "" } });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-black pt-14 bg-[#f2fbfa] items-center justify-center overflow-x-hidden">
      <h2 className={`md:text-4xl text-2xl font-bold mb-4 text-center md:mt-0 mt-10 mx-auto max-w-4xl text-gray-700 ${heading.className}`}>Upload the files you want to print</h2>

      <motion.div 
      whileHover={{
        scale:1.1,
        transition:{duration:0.1}
      }}
      whileTap={{ scale: 0.9 }}
      className="md:w-[90vw] w-[85vw] cursor-pointer
      mt-12 mx-auto border bg-[#f6f9f9] border-black flex justify-center h-[20vh] items-center">
        <label className="cursor-pointer text-black px-4 py-2 h-fit rounded-lg inline-block">
          Drag and drop your files here or <span className="font-bold text-[#026766]">BROWSE</span>
          <input type="file" multiple onChange={handleFileChange} className="hidden" />
        </label>
      </motion.div>

      <div className="mt-4 mx-auto text-center">
        {files.map((file, i) => (
          <p key={i} className="text-black font-medium text-2xl ">{file.name}  <span> <BiRightArrow/> </span></p> 
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
        whileHover={{
          scale:1.1,
          transition:{duration:0.3}
        }}
          onClick={handleUpload}
          disabled={!files.length || uploading}
          className="mt-6 px-10 py-2 text-white bg-[#026766] cursor-pointer rounded-lg"
        >
          {uploading ? "Uploading..." : "Next"}
        </motion.button>
      </div>
      <div className="mt-20">
         <Footer/>
      </div>
     
    </div>
  );
}
