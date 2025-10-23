# Ingeso Fake Falabella - Frontend Demo

Proyecto demo muy básico con React + TypeScript (Vite).

Requisitos:
- Node.js 18+ recomendado
- PowerShell en Windows

Comandos (PowerShell):

```powershell
npm install
npm run dev
```

El servidor correrá en http://localhost:5173 por defecto.

Estructura principal:
- `src/` - código fuente
- `src/pages` - páginas: Home, Product, Checkout
- `src/components` - componentes reutilizables

Separación frontend/backend
- `backend/` - carpeta preparada para la lógica del backend y contenerización (Docker). Contiene archivos base: `Dockerfile`, `.dockerignore` y un `README.md` con pasos sugeridos.

- `frontend/` - contiene todo el código del frontend (Vite + React + TypeScript). Para ejecutar el frontend, ve a `frontend/` y corre `npm install` y `npm run dev`.

Notas:
- Páginas y componentes son intencionalmente simples y cortos (<800 líneas).
- Añade más productos en `src/seed/products.ts` si quieres.
