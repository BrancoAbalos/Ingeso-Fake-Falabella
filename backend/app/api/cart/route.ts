import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

type AddBody = {
  productId: string
  quantity: number
}

export async function GET() {
  const stocks = await prisma.stockCarrito.findMany()
  const productIds = stocks.map((s) => s.producto)
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true, price: true, image: true, title: true, description: true, isFeatured: true, categoria: true }
  })

  const items = stocks.map((s) => {
    const found = products.find((p) => p.id === s.producto)
    const prod = found
      ? {
          id: found.id,
          name: found.name,
          price: found.price,
          img: (found as any).image ?? (found as any).img ?? '',
          title: found.title,
          description: found.description,
          isFeatured: found.isFeatured ?? false,
          categoria: found.categoria
        }
      : { id: s.producto }

    return { product: prod, quantity: s.cantidad }
  })

  return NextResponse.json({ items }, { headers: CORS_HEADERS })
}

export async function POST(request: Request) {
  const body: AddBody = await request.json()
  const { productId, quantity } = body

  if (!productId || typeof quantity !== 'number') {
    return new NextResponse(JSON.stringify({ error: 'Invalid payload' }), { status: 400, headers: CORS_HEADERS })
  }

  if (quantity === 0) {
    // Do nothing per requirement
    const existing = await prisma.stockCarrito.findUnique({ where: { id: productId } })
    return NextResponse.json({ productId, quantity: existing ? existing.cantidad : 0 }, { headers: CORS_HEADERS })
  }

  // Ensure product exists
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) return new NextResponse(JSON.stringify({ error: 'Product not found' }), { status: 404, headers: CORS_HEADERS })

  const existing = await prisma.stockCarrito.findUnique({ where: { id: productId } })
  let finalCantidad = 0

  if (existing) {
    const newCantidad = existing.cantidad + quantity
    if (newCantidad <= 0) {
      // remove entry
      await prisma.stockCarrito.delete({ where: { id: productId } })
      finalCantidad = 0
    } else {
      const updated = await prisma.stockCarrito.update({ where: { id: productId }, data: { cantidad: newCantidad } })
      finalCantidad = updated.cantidad
    }
  } else {
    // no existing entry
    if (quantity > 0) {
      const created = await prisma.stockCarrito.create({ data: { id: productId, producto: productId, cantidad: quantity } })
      finalCantidad = created.cantidad
    } else {
      // negative delta but no existing: nothing to do
      finalCantidad = 0
    }
  }

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

  return NextResponse.json({ item: { product: normalized, quantity: finalCantidad } }, { headers: CORS_HEADERS })
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function DELETE() {
  // Remove all items from StockCarrito (clear backend cart)
  try {
    const res = await prisma.stockCarrito.deleteMany({})
    return NextResponse.json({ deleted: res.count }, { headers: CORS_HEADERS })
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: 'Failed to clear cart' }), { status: 500, headers: CORS_HEADERS })
  }
}
