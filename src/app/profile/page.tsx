
import Redirect from "@/components/Redirect";
import { auth } from "../../../auth";
import { Merriweather } from "next/font/google";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";


const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

export default async function PersonalInfo() {
  const session = await auth();

  if(!session?.user){
    return <Redirect/>
  }

  return (
    <div className="p-8 bg-white h-screen text-center">
      
      <div className="flex justify-start">
        <Link href="/">
         <button className="flex items-center gap-2 text-gray-400 text-lg font-semibold mb-2 cursor-pointer">
         <BiArrowBack/> Back
        </button>
        </Link>
       
      </div>
      <div className="mt-10">
         <h1 className={`text-3xl font-bold text-gray-700 mb-1 ${heading.className}`}>Personal Info</h1>
      <p className="text-gray-600 mb-6">Edit your name and email</p>
      </div>
     

      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-400">First Name *</label>
          <input
            type="text"
            value={session?.user?.name?.split(" ")[0] ?? ""}
            readOnly
           className="w-full md:w-3/4 rounded py-3 px-4 focus:ring-1 border focus:border-teal-500 focus:outline-none focus:ring-teal-500 text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-400">Last Name *</label>
          <input
            type="text"
            value={session?.user?.name?.split(" ")[1] ?? ""}
            readOnly
            className="w-full md:w-3/4 rounded py-3 px-4 focus:ring-1 border focus:border-teal-500 focus:outline-none focus:ring-teal-500 text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-400">Email Address *</label>
          <input
            type="email"
            value={session?.user?.email ?? ""}
            readOnly
       className="w-full md:w-3/4 rounded py-3 px-4 focus:ring-1 border focus:border-[#f2fbfa] focus:outline-none focus:ring-teal-500 text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-400">Country</label>
          <input
            type="text"
            value="INDIA"
            readOnly
          className="w-full md:w-3/4 rounded py-3 px-4 focus:ring-1 border focus:border-teal-500 focus:outline-none focus:ring-teal-500 text-black"
          />
        </div>
      </div>

      <button className="mt-6 bg-gray-300 px-6 py-2 rounded-lg text-gray-600 font-bold cursor-not-allowed">
        SAVE
      </button>

      <p className="mt-6 text-gray-700">
        If you no longer need your account.{" "}
        <span className="text-red-600 font-semibold cursor-pointer">Delete account</span>
      </p>
    </div>
  );
}
