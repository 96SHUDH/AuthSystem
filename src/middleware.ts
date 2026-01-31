import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // ✅ FIX: Add "path === '/'" here so the Home Page is public!
  const isPublicPath = path === '/' || 
                       path === '/login' || 
                       path === '/signup' || 
                       path === '/verifyemail' ||
                       path === '/forgotpassword' || 
                       path === '/resetpassword'

  const token = request.cookies.get('token')?.value || ''

  // If user is logged in and tries to go to public auth pages, send to profile.
  // (We allow them to visit '/' even if logged in)
  if(isPublicPath && token && path !== '/') {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  // If user is NOT logged in and tries to visit a PRIVATE page (like /profile), kick them to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/forgotpassword',
    '/resetpassword'
  ]
}