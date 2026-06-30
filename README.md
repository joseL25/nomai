# nomAI

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render&logoColor=white)

NomAI es una plataforma web orientada a freelancers junior que simula escenarios reales de trabajo para que puedan practicar habilidades técnicas y blandas antes de enfrentar su primer proyecto profesional. La propuesta combina una experiencia de usuario moderna con un backend robusto y un modelo de datos persistente en Supabase.

## ¿Qué hace nomAI?

NomAI ayuda a los usuarios a:

- practicar con clientes simulados y requisitos ambiguos;
- desarrollar habilidades de comunicación, organización y resolución de problemas;
- experimentar con flujos de gestión de sesiones y usuarios en un entorno controlado;
- prepararse de forma más realista para el mundo freelance.

Este proyecto está pensado para estudiantes, juniors y perfiles que buscan una forma práctica de entrenar para el trabajo real.

## Stack tecnológico

| Área | Tecnología | Documentación |
|---|---|---|
| Frontend | React | https://react.dev/ |
| Build tool | Vite | https://vite.dev/ |
| Backend | Node.js + Express | https://nodejs.org/ | https://expressjs.com/ |
| Base de datos | Supabase | https://supabase.com/docs |
| HTTP client | Axios | https://axios-http.com/docs/intro |
| Deploy frontend | Vercel | https://vercel.com/docs |
| Deploy backend | Render | https://render.com/docs |

## Arquitectura

NomAI sigue una arquitectura de monorepo con dos partes claramente separadas:

```text
nomAI/
├── nomai-backend/   # API REST en Node.js + Express
└── nomai-frontend/  # interfaz en React + Vite
```

### Flujo general

1. El frontend consume la API del backend desde la ruta `/api`.
2. El backend gestiona la lógica de negocio y la conexión con Supabase.
3. La base de datos almacena entidades como usuarios y sesiones de simulación.

## Estructura del proyecto

```text
nomai-backend/
├── src/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middlewares/
├── index.js
└── package.json

nomai-frontend/
├── src/
│   ├── components/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
└── package.json
```

## Cómo correrlo localmente

### Requisitos

- Node.js 18 o superior
- npm o pnpm

### 1) Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd nomAI
```

### 2) Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-anon-de-supabase
VITE_API_URL=http://localhost:3000/api
```

> El frontend usa `VITE_API_URL` para apuntar a la API local. Si prefieres, también podés dejarlo como `/api` y aprovechar el proxy configurado en Vite.

### 3) Backend

```bash
cd nomai-backend
npm install
npm run dev
```

El backend quedará disponible en:

```text
http://localhost:3000
```

### 4) Frontend

En una segunda terminal:

```bash
cd nomai-frontend
npm install
npm run dev
```

El frontend quedará disponible en:

```text
http://localhost:5173
```

## Deploy

- Frontend: https://nomai-hhpbf5yg5-nomai.vercel.app/
- Backend: https://nomai-nico.onrender.com

## Nota sobre Render

El backend está desplegado en Render con el tier free. Debido a la naturaleza de ese plan, la primera solicitud puede tardar unos segundos más de lo habitual por el cold start del servicio.

## Futuro del proyecto

Este proyecto puede evolucionar hacia una experiencia más completa con:

- autenticación de usuarios;
- simulaciones con IA más ricas;
- métricas de desempeño y seguimiento de progreso;
- panel administrativo para gestionar ejercicios y feedback.


- ✅ Estructura de carpetas backend/frontend
- ✅ Express setup con CORS + routes
- ✅ Inicialización y configuración de cliente de Supabase
- ✅ SimSession y User models migrados de in-memory a Supabase (PostgreSQL)
- ✅ Controladores adaptados a llamadas asíncronas con async/await
- ✅ Frontend Vite + React bootstrap
- ✅ Services con Axios (CRUD)
- ✅ Componentes iniciales (List/Form)
- ✅ Vite proxy configurado

---

## 📝 Pendientes

### Alta Prioridad

- [ ] **Autenticación y JWT**
  - [ ] Endpoint POST `/api/auth/login`
  - [ ] Endpoint POST `/api/auth/register`
  - [ ] Middleware de validación JWT
  - [ ] Refresh tokens

- [ ] **Persistencia de datos**
  - [ ] Crear seeds y datos iniciales para la base de datos de Supabase
  - [ ] Crear migrations/seeds

- [ ] **Validación de formularios**
  - [ ] Cliente: validators en React
  - [ ] Servidor: schema validation (Zod/Yup)

- [ ] **Manejo de errores robusto**
  - [ ] Error boundaries en React
  - [ ] Error middleware centralizado en Express
  - [ ] Logging estructurado

### Media Prioridad

- [ ] **UI/UX mejorada**
  - [ ] Sistema de temas (light/dark mode)
  - [ ] Responsive design
  - [ ] Iconografía (heroicons/feather)
  - [ ] Animaciones transiciones

- [ ] **Componentes avanzados**
  - [ ] SimSession detail view
  - [ ] User profile page
  - [ ] Dashboard con estadísticas
  - [ ] Chat en tiempo real (simulación de cliente)

- [ ] **Evaluación e IA**
  - [ ] Endpoint evaluación de respuestas
  - [ ] Rúbricas de soft skills
  - [ ] Integración con IA para feedback automático
  - [ ] Generación dinámica de escenarios

### Baja Prioridad

- [ ] **DevOps**
  - [ ] Docker Compose (frontend + backend)
  - [ ] GitHub Actions CI/CD
  - [ ] Deployment a Vercel/Railway/Heroku

- [ ] **Testing**
  - [ ] Tests unitarios (Jest/Vitest)
  - [ ] Tests de integración (Supertest)
  - [ ] E2E tests (Playwright/Cypress)

- [ ] **Documentación**
  - [ ] API docs (Swagger/OpenAPI)
  - [ ] Contributing guide
  - [ ] Architecture decision records

---

## 🎨 Logo & Branding (Concepto)

```
    ╔═══════════════╗
    ║  nomAI 🤖    ║
    ║  Learn by     ║
    ║  Doing Real   ║
    ║  Projects     ║
    ╚═══════════════╝
```

**Colores sugeridos:**
- Primary: `#2563eb` (Azul profesional)
- Success: `#16a34a` (Verde)
- Warning: `#f59e0b` (Naranja)
- Danger: `#dc2626` (Rojo)
- Neutral: `#374151` (Gris oscuro)

---

## 💡 Notas de Desarrollo

### Rutas de Base
- Backend monta servicios en `/api`
- Simulaciones: `/api/sia` (no `/api/simsessions`)
- Usuarios: `/api/users`

### Services Frontend
- Normalizan respuestas del backend (raw data)
- Todas las funciones retornan `response.data` o `response.data.data`
- `update()` usa `PATCH` por convención REST

### Estado Local
- `App.jsx` maneja `refreshKey` para recargar listas
- Cada componente Form dispara callback `onCreated()` tras éxito
- React Hooks: `useState`, `useEffect`

---

## 📞 Contacto & Soporte

Para preguntas, issues o sugerencias, abre un issue en el repositorio.
