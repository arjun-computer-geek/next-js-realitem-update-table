import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    { ticker: 'US10Y', instrument: 'Bond', p_l: 980.81, totalValue: 98080.97, quantity: 1000, price: 100 },
    { ticker: 'CAD30Y', instrument: 'Bond', p_l: -24.7, totalValue: 50978.56, quantity: 550, price: 96 },
  ];

  return NextResponse.json(data);
}
