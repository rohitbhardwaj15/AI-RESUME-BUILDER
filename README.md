# AI Resume Builder (MERN + AI + 3D SaaS UI)

Production-ready full-stack AI Resume Builder with React + Tailwind + Framer Motion + Three.js frontend and Node/Express/MongoDB backend.

## 1) Folder Structure

```txt
ai-resume-builder/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      app.js
      server.js
    .env.example
    package.json
  frontend/
    src/
      app/
      components/
        forms/
        layout/
        preview/
        templates/
      pages/
      services/
      store/
      utils/
      main.jsx
      styles.css
    .env.example
    package.json
  README.md
```

## 2) Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Backend APIs
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/user/me`
- `PUT /api/user/profile`
- `GET /api/resume`
- `POST /api/resume`
- `GET /api/resume/:id`
- `PUT /api/resume/:id`
- `DELETE /api/resume/:id`
- `PATCH /api/resume/:id/visibility`
- `GET /api/resume/public/:slug`
- `POST /api/ai/summary`
- `POST /api/ai/experience`
- `POST /api/ai/ats`
- `POST /api/upload/profile-image`

## 3) Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 4) AI Integration

- OpenAI endpoints in backend:
  - summary enhancement
  - experience enhancement
  - ATS suggestions
- If `OPENAI_API_KEY` is not set, backend returns realistic local enhancement output for local development.

## 5) Features Included

- JWT auth with protected routes
- Resume CRUD dashboard
- Dynamic add/remove sections
- AI buttons with animated loading feedback
- Template switcher via switch-case rendering
- Color customization
- Live preview during editing
- PDF export (`html2canvas` + `jspdf`)
- Public share link with private/public toggle
- Profile image upload via Multer + ImageKit
- Optional background removal hook (`REMOVEBG_API_KEY`)
- Responsive modern SaaS UI with Framer Motion + Three.js hero

## 6) Environment Variables

### `backend/.env`
Use values from `backend/.env.example`:
- `PORT`
- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `FRONTEND_URL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_PRIVATE_KEY`
- `IMAGEKIT_URL_ENDPOINT`
- `REMOVEBG_API_KEY`

### `frontend/.env`
Use values from `frontend/.env.example`:
- `VITE_API_URL`

## 7) Deployment Guide

### Step 1: MongoDB Atlas
1. Create cluster and DB user.
2. Whitelist backend server IP.
3. Put connection string into `MONGODB_URI`.

### Step 2: Deploy Backend on VPS
1. Install Node.js 20+, Nginx, PM2.
2. Upload `backend/` and run:
   ```bash
   npm install
   npm run start
   ```
3. Run with PM2:
   ```bash
   pm2 start src/server.js --name ai-resume-backend
   pm2 save
   ```

### Step 3: Nginx Reverse Proxy

```nginx
server {
  listen 80;
  server_name api.yourdomain.com;

  location / {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Then enable SSL:
```bash
sudo certbot --nginx -d api.yourdomain.com
```

### Step 4: Deploy Frontend on Vercel
1. Import `frontend/` repo/folder into Vercel.
2. Set env var `VITE_API_URL=https://api.yourdomain.com/api`.
3. Deploy and connect custom domain.

## 8) Production Notes

- Add request validation (Zod/Joi) for stricter API contracts.
- Add rate limiting and helmet middleware.
- Add refresh token strategy if long sessions are needed.
- Add test suite (Jest + RTL + Cypress/Playwright).