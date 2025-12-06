import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  const product = await prisma.product.findUnique({
    where: { id },
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

  if (!product) return new NextResponse(JSON.stringify({ error: 'Not found' }), { status: 404, headers: CORS_HEADERS })

  const normalized = {
    id: product.id,
    name: product.name,
    price: product.price,
    img: (product as any).image ?? (product as any).img ?? '',
    title: product.title,
    description: product.description,
    isFeatured: product.isFeatured ?? false,
    categoria: product.categoria
  }

  return NextResponse.json({ product: normalized }, { headers: CORS_HEADERS })
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}
