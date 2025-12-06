const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
  try{
    console.log('DATABASE_URL (env):', process.env.DATABASE_URL)
    const productCount = await prisma.product.count()
    console.log('Product count:', productCount)
    const products = await prisma.product.findMany({ take: 10 })
    console.log('Products sample:', products)

    const stockCount = await prisma.stockCarrito.count()
    console.log('StockCarrito count:', stockCount)
    const stocks = await prisma.stockCarrito.findMany({ take: 10 })
    console.log('Stock sample:', stocks)
  }catch(e){
    console.error('Error checking DB:', e)
  }finally{
    await prisma.$disconnect()
  }
}

main()
