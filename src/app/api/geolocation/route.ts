import { geolocation } from '@vercel/functions';
import { NextRequest } from 'next/server';
 
export function GET(request: NextRequest) {
  const details = geolocation(request);
  return Response.json(details);
}