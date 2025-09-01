import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET(request:NextRequest){
    
    const orders = await prisma.order.findMany({
        where:{user_id:1111}
    })

    if(!orders){
        return console.log("no order")
    }

    return NextResponse.json({orders})
}