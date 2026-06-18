# 🚀 NomAI

**Plataforma de simulaciones realistas para freelancers junior**

NomAI es una plataforma educativa donde freelancers junior adquieren experiencia práctica mediante simulaciones de proyectos realistas. Evaluamos tanto habilidades técnicas como soft skills (comunicación, gestión del tiempo, resolución de problemas).

---

## 📋 Visión del Proyecto

- **Target**: Freelancers junior sin experiencia profesional
- **Objetivo**: Preparar developers para proyectos reales mediante simulaciones de clientes, requisitos ambiguos y feedback continuo
- **Diferenciador**: Evaluación integral (técnico + soft skills)
- **Modelo**: Simulaciones gamificadas con retroalimentación de IA

---

## 🏗️ Arquitectura

### Stack Tecnológico

```
┌─────────────────────────────────────────┐
│         Frontend (nomai-frontend)        │
│  Vite + React + Axios                   │
│  http://localhost:5174                  │
└─────────────────────────────────────────┘
              ↕ (Proxy /api)
┌─────────────────────────────────────────┐
│        Backend (nomai-backend)           │
│  Node.js + Express                       │
│  http://localhost:3000                  │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│    Models (In-Memory - Development)     │
│  - SimSession Model                      │
│  - User Model                            │
└─────────────────────────────────────────┘
```

### Estructura de Carpetas

```
nomAI/
├── nomai-backend/
│   ├── src/
│   │   ├── app.js                    # Express app setup
│   │   ├── controllers/
│   │   │   ├── simsession.controller.js
│   │   │   └── user.controller.js
│   │   ├── models/
│   │   │   ├── simsession.model.js   # SimSession CRUD (in-memory)
│   │   │   └── user.model.js         # User CRUD (in-memory)
│   │   ├── routes/
│   │   │   ├── index.routes.js       # Main router
│   │   │   ├── simsessions.routes.js # POST/GET /api/sia
│   │   │   └── users.routes.js       # POST/GET /api/users
│   │   └── middlewares/
│   │       └── notFound.middlewares.js
│   ├── index.js                      # Server entry point
│   └── package.json
│
├── nomai-frontend/
│   ├── src/
│   │   ├── main.jsx                  # React entry
│   │   ├── App.jsx                   # Main component
│   │   ├── services/
│   │   │   ├── simSession.service.js # GET/POST /api/sia
│   │   │   └── user.service.js       # GET/POST /api/users
│   │   └── components/
│   │       ├── SimSessionList.jsx    # Display sessions
│   │       ├── SimSessionForm.jsx    # Create session
│   │       ├── UserList.jsx          # Display users
│   │       └── UserForm.jsx          # Create user
│   ├── vite.config.js                # Vite + proxy config
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## 🛠️ Especificaciones

### Backend API

#### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/users` | Listar todos los usuarios |
| GET | `/api/users/:id` | Obtener usuario por ID |
| POST | `/api/users` | Crear nuevo usuario |
| PATCH | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |
| GET | `/api/sia` | Listar todas las simulaciones |
| GET | `/api/sia/:id` | Obtener simulación por ID |
| POST | `/api/sia` | Crear nueva simulación |
| PATCH | `/api/sia/:id` | Actualizar simulación |
| DELETE | `/api/sia/:id` | Eliminar simulación |

#### Modelos

**User Model**
```javascript
{
  id: string (UUID),
  email: string (unique),
  password_hash: string,
  full_name: string,
  avatar_url: string | null,
  role: 'freelancer' | 'recruiter' | 'admin',
  status: 'active' | 'suspended' | 'pending_verification',
  created_at: ISO 8601,
  updated_at: ISO 8601
}
```

**SimSession Model**
```javascript
{
  id: string (UUID),
  user_id: string,
  project_id: string,
  company_id: string,
  ai_persona_id: string,
  status: 'pending' | 'active' | 'completed' | 'abandoned',
  mode: 'learning' | 'recruitment',
  started_at: ISO 8601 | null,
  completed_at: ISO 8601 | null,
  deadline: ISO 8601 | null,
  last_activity_at: ISO 8601,
  trigger_log: Array<{trigger_id, event, timestamp, metadata}>,
  metadata: {
    difficulty: string,
    tags: Array<string>
  },
  created_at: ISO 8601
}
```

#### Formato de Respuesta

Backend devuelve datos **sin envoltorio** (raw array/object):

**GET /api/sia**
```json
[
  {
    "id": "simsession-001",
    "project_id": "project-001",
    "company_id": "company-001",
    ...
  }
]
```

**GET /api/users**
```json
[
  {
    "id": "user-123",
    "email": "user@nomai.app",
    ...
  }
]
```

### Frontend Services

Cada servicio expone CRUD consistente:

```javascript
// simSession.service.js & user.service.js
export const service = {
  getAll(),        // GET /
  getById(id),     // GET /:id
  create(data),    // POST /
  update(id, data),// PATCH /:id
  remove(id)       // DELETE /:id
}
```

---

## 🎨 Diseño Visual Implementado

### Principios de diseño
- **Dark mode premium** con fondo `#15121b` y texto principal `#e8dfee`.
- **Glass-card effect** en tarjetas y formularios usando `backdrop-filter: blur(12px)` y bordes translucidos.
- **Paleta de colores** basada en Stitch: púrpura `#7c3aed`, azul `#2563eb`, cian `#4cd7f6`, verde `#16a34a` y rojo `#ef4444`.
- **Tipografía** con `Inter`, jerarquía visual clara y tamaños acordes a los diseños (headline-xl, headline-lg, body-md).
- **Interacción** con hover suaves, botones elevados y estados de foco en inputs.

### Componentes estilizados
- **`SimSessionList`**: tarjetas responsive con estado, etiquetas de modo y estado, detalles agrupados y animación al pasar el mouse.
- **`UserList`**: diseño coherente con `SimSessionList`, grid responsive y tarjetas glass con información del usuario.
- **`SimSessionForm`**: formulario con contenedor glass-card, inputs estilizados y botones primarios/claro.
- **`UserForm`**: mismo estilo que el formulario de simulaciones, con selects y botones consistentes.
- **`Nav`**: barra de navegación glass, estado activo visible y estilo dark.
- **`App`**: layout global con fondo oscuro, tipografía Stitch y estructura de secciones bien diferenciadas.
- **`index.html`**: estilos globales para tipografía, scrollbars, inputs y reset básico.

### Lógica preservada
- `useEffect` con dependencias de refresco en los listados.
- Fetch al service (`simSessionService`, `userService`) sin alterar la estructura de datos.
- Estados de componente: `loading`, `error`, `empty`.
- Uso de `.map()` para renderizar listas.
- Campos originales de los modelos de sesión y usuario respetados.

---

## 🚀 Quick Start

### Backend

```bash
cd nomai-backend
npm install
npm run dev
# Server runs on http://localhost:3000
```

### Frontend

```bash
cd nomai-frontend
npm install
npm run dev
# App runs on http://localhost:5174
# Vite proxy forwards /api requests to http://localhost:3000
```

---

## ✅ Completado

- ✅ Estructura de carpetas backend/frontend
- ✅ Express setup con CORS + routes
- ✅ SimSession y User models (in-memory)
- ✅ Controllers con serialización
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
  - [ ] Migrar de in-memory a base de datos (MongoDB o PostgreSQL)
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
