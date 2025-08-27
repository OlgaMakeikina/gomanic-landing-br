import { NextRequest, NextResponse } from 'next/server';

const FRESHA_LINKS = {
  'vip80': 'https://www.fresha.com/pt/book-now/unhas5estrelas-l8cyuau9/services?lid=1206648&share=true&pId=1144989',
  'vip160': 'https://www.fresha.com/pt/book-now/unhas5estrelas-l8cyuau9/services?lid=1206648&oiid=sv%3A24424946&share=true&pId=1144989',
  'vip119': 'https://www.fresha.com/pt/book-now/unhas5estrelas-l8cyuau9/services?lid=1206648&oiid=sv%3A24424860&share=true&pId=1144989'
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  const redirectUrl = FRESHA_LINKS[slug as keyof typeof FRESHA_LINKS];
  
  if (!redirectUrl) {
    return NextResponse.json(
      { error: 'Link não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.redirect(redirectUrl, 302);
}
