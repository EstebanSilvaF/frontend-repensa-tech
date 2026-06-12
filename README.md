# Re-Pensa Tech — Frontend

Frontend de **Re-Pensa Tech**: marketplace universitario para comprar, vender y donar hardware electrónico dentro de cada institución.

Stack: React 19, TypeScript, Vite, React Router.

## Requisitos

- Node.js 20+
- npm 10+
- Backend corriendo en `http://localhost:3000` (ver `FRONTEND_API.md`)

## Instalación

```bash
cd repensa-tech
npm install
cp .env.example .env
npm run dev
```

La app queda en `http://localhost:5173`.

## Variables de entorno

| Variable | Descripción | Desarrollo |
|----------|-------------|------------|
| `VITE_API_URL` | Base URL de la API | `/api` (usa el proxy de Vite) |

En producción, apuntar a la URL real del backend, por ejemplo:

```env
VITE_API_URL=https://api.tu-dominio.com/api
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | ESLint |

## Pantallas actuales

| Ruta | Pantalla |
|------|----------|
| `/` | Galería de productos |
| `/home` | Landing |
| `/login` | Inicio de sesión |
| `/register` | Registro |

## API

La documentación de integración con el backend está en [`FRONTEND_API.md`](./FRONTEND_API.md).

En desarrollo, Vite hace proxy de `/api` y `/health` hacia `localhost:3000`.

## Estructura

```
frontend-repensa-tech/
├── FRONTEND_API.md      # Guía de integración con el backend
└── repensa-tech/        # Aplicación React (Vite)
    ├── src/
    │   ├── api/         # Cliente y servicios HTTP
    │   ├── components/
    │   ├── context/     # Auth
    │   ├── hooks/
    │   ├── pages/
    │   ├── routes/
    │   ├── types/
    │   └── utils/
    ├── public/
    └── package.json
```
