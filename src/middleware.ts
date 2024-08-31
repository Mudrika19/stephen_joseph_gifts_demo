import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Extract hostname from request
  const hostname = req.headers.get('host') || '';
  // Assuming localhost with port (e.g., localhost:3000)
  const tenant = hostname.split('.')[0];
  // Add the tenant to the request headers
  const response = NextResponse.next();
  
  response.cookies.set("tenant", tenant, { path: '/' });

  return response;
}