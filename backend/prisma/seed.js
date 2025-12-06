const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const products = [
  { id: '101', name: 'Eristoff', price: 5990, image: 'https://storage.googleapis.com/liquidos-public/products/large/1334068.png', description: 'Vodka premium de sabor suave y limpio, ideal para cócteles clásicos.' },
  { id: '102', name: 'Absolut Blue', price: 11990, image: 'https://i0.wp.com/8barrelsclub.com/wp-content/uploads/2021/06/Absolut-Blue-70cl-2-1.png?fit=1000%2C1000&ssl=1', description: 'Vodka de calidad con notas neutras, perfecto para mezclas y shots.' },
  { id: '103', name: 'Absolut Rasp', price: 12990, image: 'https://storage.googleapis.com/liquidos-public/products/large/1334058_lg.png', description: 'Vodka sabor frambuesa, aromático y dulce, pensado para cócteles afrutados.' },
  { id: '104', name: 'Eristoff Black', price: 4990, image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSb09R-6vgFOaH06b_hKUMyUpFQbzI6BcdJpQEhStxMKctveEKbvgkZDNrTnavi3iB9ZUXedAiobylta4qsozHG9neSWEJHOV2xYDwQ5w', description: 'Versión oscura y contundente; ideal para bebidas fuertes y con carácter.' },
  { id: '105', name: 'Absolut Colors', price: 25990, image: 'https://img.thewhiskyexchange.com/540/vodka_abs75.jpg', description: 'Selección de vodkas con colores y sabores para crear tragos llamativos.' },
  { id: '106', name: 'Pisco Mistral', price: 149900, image: 'images/1.jpg', categoria: 'Pisco', description: 'Pisco premium con notas florales y frutales, excelente para pisco sour.' },
  { id: '107', name: 'Vino Conchatumadre y Toro', price: 89990, image: 'images/2.jpg', categoria: 'Vino', description: 'Vino tinto de cuerpo medio, ideal para acompañar carnes y pastas.' },
  { id: '108', name: 'Bierhaus Austral (Cerveza)', price: 3990, image: 'images/3.jpg', categoria: 'Cerveza', description: 'Cerveza artesanal con sabor equilibrado y final refrescante.' },
  { id: '201', name: 'Corona', price: 4990, image: 'https://static.vecteezy.com/system/resources/previews/037/751/355/non_2x/corona-extra-beer-bottle-isolated-on-a-transparent-background-free-png.png', isFeatured: true, description: 'Cerveza lager clara y refrescante, perfecta para compartir.' },
  { id: '202', name: 'Alto del Carmen', price: 7990, image: 'https://www.distribuidoralamartina.cl/wp-content/uploads/2021/04/alto-del-carmen-35-1lt.png', isFeatured: true, description: 'Pisco tradicional chileno, con cuerpo y notas herbales.' },
  { id: '203', name: 'Vino Selecto Frutal', price: 4590, image: 'https://storage.googleapis.com/liquidos-public/products/large/1453005.png', isFeatured: true, description: 'Vino joven con perfil frutal, fácil de beber en cualquier ocasión.' },
  { id: '204', name: 'Fireball', price: 9990, image: 'https://store.sazerachouse.com/media/catalog/product/p/f/pfcw0094_inflatable_bottle_3_main.png?quality=80&fit=bounds&height=&width=', isFeatured: true, description: 'Whisky con sabor a canela, picante y dulce — ideal para shots.' },
  { id: '205', name: 'Jack Daniels Honey', price: 15990, image: 'https://cdnx.jumpseller.com/glops/image/37723937/resize/719/719?1733415383', isFeatured: true, description: 'Whisky Tennessee infusionado con miel, suave y con dulzor agradable.' }
]

async function main() {
  console.log('Running seed script...')

  for (const p of products) {
    try {
      await prisma.product.upsert({
        where: { id: p.id },
        update: {
          name: p.name,
          price: p.price,
          image: p.image,
          title: p.title,
          description: p.description,
          isFeatured: p.isFeatured || false,
          categoria: p.categoria
        },
        create: {
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          title: p.title,
          description: p.description,
          isFeatured: p.isFeatured || false,
          categoria: p.categoria
        }
      })
      console.log('Upserted product', p.id)
    } catch (e) {
      console.error('Failed upserting product', p.id, e)
    }
  }

  // Seed StockCarrito entries (producto id + cantidad)
  const stockItems = [
    { producto: '201', cantidad: 0 },
    { producto: '202', cantidad: 0 },
    { producto: '203', cantidad: 0 }
  ]

  for (const s of stockItems) {
    try {
      await prisma.stockCarrito.upsert({
        where: { id: s.producto },
        update: { cantidad: s.cantidad },
        create: { id: s.producto, producto: s.producto, cantidad: s.cantidad }
      })
    } catch (e) {
      try {
        await prisma.stockCarrito.create({ data: { producto: s.producto, cantidad: s.cantidad } })
      } catch (err) {
        console.warn('Could not create stockCarrito for', s.producto, err?.message)
      }
    }
  }

  console.log('Seed finished')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
