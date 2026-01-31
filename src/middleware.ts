import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || 
                       path === '/login' || 
                       path === '/signup' || 
                       path === '/verifyemail' ||
                       path === '/forgotpassword' || 
                       path === '/resetpassword'

  const token = request.cookies.get('token')?.value || ''

  // ✅ FIX: Add "&& path !== '/verifyemail'" so logged-in users don't get kicked out!
  if(isPublicPath && token && path !== '/' && path !== '/verifyemail') {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

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