# Frontend

Código del frontend (React + TypeScript) movido a `frontend/`.

Para ejecutar (desde `frontend/`):

```powershell
npm install
npm run dev
```

Host por defecto: http://localhost:5173

Problemas con imágenes que no cargan
---------------------------------

Si una imagen remota no se muestra en el navegador, prueba lo siguiente:

- Abre la consola del navegador (F12) y revisa la pestaña Network: busca la petición de la imagen y revisa el código de estado (404, 401, 403, etc.).
- Revisa errores CORS: si la petición se bloquea por CORS verás un error explícito en la consola. En ese caso, usa imágenes alojadas en tu propio dominio (`/public`) o configura un proxy en el backend.
- Revisa si la URL usa `http://` mientras tu app corre en `https://` (Mixed Content). En ese caso, usa `https://` o imágenes locales.
- Puedes usar placeholders locales: coloca imágenes en `frontend/public/` y referéncialas como `/mi-imagen.jpg`.

Fallback en la UI
- El componente de producto ya usa un placeholder (`/placeholder.svg`) cuando la carga falla. Para pruebas locales, añade imágenes a `frontend/public/`.

