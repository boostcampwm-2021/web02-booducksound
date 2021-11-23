import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies;
  const token = cookie.token;
  const notLoginUrlList = ['/', '/login', '/enter', '/join'];
  const loginUrlList = ['/mypage', '/lobby', '/playlist', '/game'];

  if (token && notLoginUrlList.some((path) => pathname === path)) return NextResponse.redirect('/lobby');
  if (!token && loginUrlList.some((path) => pathname.includes(path))) return NextResponse.redirect('/');
};
