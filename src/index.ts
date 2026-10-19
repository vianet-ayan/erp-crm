import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static' // Works for Node/Vercel/Bun depending on adapter

const app = new Hono()

// 1. API routes (Keep your API prefix)
app.get('/api/hello', (c) => {
  return c.text('Hello from Hono API!')
})

// 2. Serve static assets (JS, CSS, images) from Vite build
app.use('/assets/*', serveStatic({ root: './frontend/ERP/dist' }))
app.use('/favicon.ico', serveStatic({ root: './frontend/ERP/dist' }))

// 3. SPA Fallback: Send all other requests to React's index.html
app.use('*', serveStatic({ 
  root: './frontend/ERP/dist',
  path: 'index.html' 
}))

export default app