'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function Redirect(){
    const router = useRouter();
    useEffect(()=>{
        router.push("/");
    },[]);

    return <div className="h-screen flex justify-center items-center bg-white "> <LoaderCircle className="animate-spin text-[#026766]" size={40} /></div>;
}