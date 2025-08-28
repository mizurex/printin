"use client";
import { useState } from "react";
import { Merriweather } from "next/font/google";
import {motion} from "motion/react"
import { BiRightArrow } from "react-icons/bi";

const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

type Props = {
  orderData: any;
  setOrderData: (data: any) => void;
  nextStep: () => void;
};

export default function FileUpload({ orderData, setOrderData, nextStep }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploaded = Array.from(e.target.files);
      setFiles(uploaded);
      setOrderData({ ...orderData, files: uploaded });
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
        console.log("Cloudinary URLs:", json.files);
        setOrderData({ ...orderData, fileUrls: json.files });
        nextStep();
      } else {
        alert("Upload failed, please try again");
        setFiles([]);
        setOrderData({ ...orderData, files: [] });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading");
      setFiles([]);
      setOrderData({ ...orderData, files: [] });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-black pt-14 bg-[#f2fbfa] h-screen">
      <h2 className={`text-4xl font-bold mb-4 text-center text-gray-700 ${heading.className}`}>Upload the files you want to print</h2>

      <motion.div 
      whileHover={{
        scale:1.1,
        transition:{duration:0.1}
      }}
      whileTap={{ scale: 0.9 }}
      className="w-[85vw] cursor-pointer
      mt-12 mx-auto border bg-[#f6f9f9] border-black flex justify-center h-[20vh] items-center">
        <label className="cursor-pointer text-black px-4 py-2 h-fit rounded-lg inline-block">
          Drag and drop your files here or <span className="font-bold text-[#026766]">BROWSE</span>
          <input type="file" multiple onChange={handleFileChange} className="hidden" />
        </label>
      </motion.div>

      <div className="mt-4 mx-50">
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
    </div>
  );
}
