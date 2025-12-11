// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  response.headers.delete('x-powered-by');
  response.headers.delete('server');
  return response;
}
