import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Permitir requests desde tu app React en desarrollo
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')

    // Manejar preflight requests
    if (request.method === 'OPTIONS') {
        return response
    }

    return response
}

export const config = {
    matcher: '/api/:path*',
}
