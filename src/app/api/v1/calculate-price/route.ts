import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { files, options, copies, service } = body;

   const numFiles = 1;

const printingRate = options.colour === "color" ? 0.25 : 0.10;
const printingCost = numFiles * printingRate * copies;

let total = printingCost;

// Add delivery cost
const deliveryCost = service.method === "delivery" ? 2.5 : 0;
total += deliveryCost;

// Add tax (20%)
const tax = total * 0.2;
total += tax;

return NextResponse.json({
  total: parseFloat(total.toFixed(2)),
  breakdown: {
    printing: parseFloat(printingCost.toFixed(2)),
    delivery: deliveryCost,
    tax: parseFloat(tax.toFixed(2)),
  },
});

  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate price' }, { status: 500 });
  }
}