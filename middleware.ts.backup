import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SHORT_LINKS = {
  '/vip80': 'https://www.fresha.com/pt/book-now/unhas5estrelas-l8cyuau9/services?lid=1206648&share=true&pId=1144989',
  '/vip160': 'https://www.fresha.com/pt/book-now/unhas5estrelas-l8cyuau9/services?lid=1206648&oiid=sv%3A24424946&share=true&pId=1144989',
  '/vip119': 'https://www.fresha.com/pt/book-now/unhas5estrelas-l8cyuau9/services?lid=1206648&oiid=sv%3A24424860&share=true&pId=1144989'
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  if (SHORT_LINKS[pathname as keyof typeof SHORT_LINKS]) {
    const redirectUrl = SHORT_LINKS[pathname as keyof typeof SHORT_LINKS];
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/vip80', '/vip160', '/vip119']
};
