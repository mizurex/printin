import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { files, options, copies, service } = body;

    // Simple price calculation
    let total = 0;
    
    // Count total pages
    const totalPages = files.reduce((sum: number, file: any) => sum + file.pages, 0);
    
    // Calculate printing cost
    const printingRate = options.colour === 'color' ? 0.25 : 0.10; // 25p color, 10p B&W
    const printingCost = totalPages * printingRate * copies;
    total += printingCost;
    
    // Add delivery cost
    if (service.method === 'delivery') {
      total += 2.50;
    }
    
    // Add tax (20%)
    const tax = total * 0.20;
    total += tax;

    return NextResponse.json({
      total: 100, // Round to 2 decimal places
      breakdown: {
        printing: printingCost,
        delivery: service.method === 'delivery' ? 2.50 : 0,
        tax: 100
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate price' }, { status: 500 });
  }
}