# Ingeso Fake Falabella - Frontend Demo

Proyecto demo muy básico con React + TypeScript (Vite).

Requisitos:
- Node.js 18+ recomendado
- PowerShell en Windows

Comandos (PowerShell):

# Ingeso Fake Falabella

Aplicación demo (frontend + backend) para gestionar catálogo y carrito. Este README explica cómo inicializar el proyecto desde cero, ejecutar frontend y backend, poblar la base de datos y solucionar problemas comunes en Windows (Prisma).

**Requisitos**
- **Node.js** v18+ y **npm**
- **Docker Desktop** (opcional, recomendado para PostgreSQL)
- PowerShell (Windows) — ejecutar como Administrador si aparecen problemas de permisos

**Terminales recomendadas**
- Terminal 1 — (opcional) Base de datos Docker: `docker-compose up -d`
- Terminal 2 — Backend: instalar deps, generar Prisma, migrar/seed y ejecutar Next.js
- Terminal 3 — Frontend: instalar deps y ejecutar Vite

Puedes reducir a 2 terminales si pones Docker en background con `-d`.


## Inicializar desde cero (PowerShell)

1) Clonar repo

```powershell
git clone https://github.com/BrancoAbalos/Ingeso-Fake-Falabella.git
cd Ingeso-Fake-Falabella
```

2) (Opcional) Levantar Postgres con Docker (recomendado)

```powershell
cd backend
docker-compose up -d
docker ps
```

3) Backend — instalar deps y generar cliente Prisma

```powershell
cd backend
npm install
npx prisma generate
```

Si `npx prisma generate` falla en Windows con EPERM (rename query_engine...):
- Cierra procesos Node/Next.
- Elimina temporales de Prisma:

```powershell
Remove-Item -Path .\node_modules\.prisma\* -Recurse -Force -ErrorAction SilentlyContinue
```
- Ejecuta PowerShell como Administrador o reinicia Windows y reintenta `npx prisma generate`.

4) Backend — aplicar migraciones / crear esquema

Si quieres usar migraciones locales (destructivas en algunos casos):

```powershell
npx prisma migrate dev --name init
```

Si no necesitas migraciones, puedes empujar el esquema directamente:

```powershell
npx prisma db push
```

5) Backend — poblar datos (seed)

Si `prisma generate` se ejecutó con éxito:

```powershell
node prisma/seed.js
# o
npx prisma db seed
```

Si `prisma generate` no puede ejecutarse, usa el SQL manual:

```powershell
npx prisma db execute --file=prisma/manual_seed.sql --url "$env:DATABASE_URL"
```

6) Backend — arrancar servidor

```powershell
npm run dev
```

7) Frontend — instalar y arrancar

```powershell
cd ../frontend
npm install
npm run dev
```

Por defecto Vite muestra la URL (p.ej. `http://localhost:5173`). El frontend usa `VITE_API_BASE` para llamadas a la API.

## Endpoints principales
- `GET /api/products` → `{ products: [...], topPicks?: [...] }`
- `GET /api/products/:id` → `{ product: {...} }`
- `GET /api/cart` → `{ items: [...] }`
- `POST /api/cart` → body `{ productId, quantity }` (quantity puede ser negativo para decrementar)
- `DELETE /api/cart` → vacía el carrito en la base de datos

El frontend está preparado para usar el backend y, si falla, caer al archivo `frontend/public/products.json`.

## Flujo de pruebas rápidas (curl)

```powershell
curl http://localhost:3001/api/products
curl http://localhost:3001/api/products/101
curl -X POST http://localhost:3001/api/cart -H "Content-Type: application/json" -d '{"productId":"101","quantity":1}'
curl -X DELETE http://localhost:3001/api/cart
```

## Notas de desarrollo
- El frontend espera objetos con `img` para la imagen; el backend normaliza `image` → `img` en las respuestas.
- El carrito se sincroniza con la tabla `StockCarrito` en la DB. El backend soporta deltas negativos para decrementar y borra filas cuando la cantidad llega a 0.