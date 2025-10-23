import { Product } from '../types'

// Use BASE_URL so paths resolve correctly in dev/preview/build
const base = ((import.meta as any).env?.BASE_URL as string) ?? '/'

export const products: Product[] = [
  {
    id: '1',
    title: 'Pisco Mistral',
    price: 149900,
    image: `${base}images/1.jpg`
  },
  {
    id: '2',
    title: 'Vino Concha y Toro',
    price: 89990,
    image: `${base}images/2.jpg`
  },
  {
    id: '3',
    title: 'Bierhaus Austral (Cerveza)',
    price: 3990,
    image: `${base}images/3.jpg`
  }
]
