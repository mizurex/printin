// components/FileUpload.tsx
import { useState } from "react";

type Props = {
  orderData: any;
  setOrderData: (data: any) => void;
  nextStep: () => void;
};

export default function FileUpload({ orderData, setOrderData, nextStep }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploaded = Array.from(e.target.files);
      setFiles(uploaded);
      setOrderData({ ...orderData, files: uploaded });
    }
  };

  return (
    <div className="text-black">
        <div className="flex justify-center">  
            
      <h2 className="text-3xl font-bold mb-4">Upload the files you want to print</h2>
        </div>
        <div className="w-full border bg-[#f2fbfa] border-black flex justify-center h-[40vh] items-center">
            <label className="cursor-pointer text-black px-4 py-2 h-fit rounded-lg inline-block">
  Drag and drop your files here or <span>BROWSE </span> 
  <div className="flex justify-center">
    <p className="text-black">
        (25MB max file size)
    </p>
  </div>
  <input
    type="file"
    multiple
    onChange={handleFileChange}
    className="hidden"
  />
</label>
        </div>
     
      <div className="mt-4">
        {files.map((file, i) => (
          <p key={i} className="text-black">{file.name}</p>
        ))}
      </div>
      <div className="flex justify-center">
          <button
        onClick={nextStep}
        disabled={!files.length}
        className="mt-6 px-10 py-2  text-white bg-[#1b1b1d] rounded-lg"
      >
        Next
      </button>
      </div>
    
    </div>
  );
}
