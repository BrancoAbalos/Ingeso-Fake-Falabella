import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

export async function GET() {
  const raw = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      title: true,
      description: true,
      isFeatured: true,
      categoria: true
    }
  })

  const products = raw.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    img: (p as any).image ?? (p as any).img ?? '',
    title: p.title,
    description: p.description,
    isFeatured: p.isFeatured ?? false,
    categoria: p.categoria
  }))

  return NextResponse.json({ products }, { headers: CORS_HEADERS })
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}
