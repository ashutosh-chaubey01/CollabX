🚀 CollabX
CollabX is a full-stack collaboration platform built with Next.js App Router, MongoDB, and JWT authentication.
It supports secure authentication, persistent user sessions, and protected routes.

✨ Features
✅ JWT-based authentication (server-side)
✅ HTTP-only cookies for security
✅ MongoDB database with Mongoose
✅ Protected routes using middleware
✅ User profile & dashboard
✅ Scalable App Router architecture (Next.js 14)

🛠 Tech Stack
-Frontend: Next.js 14 (App Router)
-Backend: Next.js API Routes
-Database: MongoDB + Mongoose
-Authentication: JWT (JSON Web Token)

Styling: Tailwind CSS

Language: TypeScript
🔐 Authentication Flow (JWT)
User logs in via /api/auth/login
Server creates a JWT
JWT is stored in an HTTP-only cookie
Middleware protects /dashboard and /profile
Session is validated via /api/auth/session

🔒 Protected Routes
These routes require authentication:
/dashboard-personal
/profile
Handled using Next.js middleware.

🧪 Debugging & Common Issues
❌ JWT_SECRET not defined
✔ Ensure .env.local exists
✔ Restart the dev server
✔ Do NOT use .env (use .env.local)

❌ User always not logged in (401)
✔ Check cookie exists in browser
✔ Cookie name must match AUTH_COOKIE_NAME
✔ Login API must call setAuthCookie()

🚀 Production Notes
Set NODE_ENV=production
Use a strong JWT_SECRET
Enable HTTPS for secure cookies
Use MongoDB Atlas for production DB

📌 Future Improvements
Refresh token support
Role-based access (admin/user)
Project collaboration features
Notifications & real-time updates

👤 Author
Ashutosh Chaubey
GitHub:@ashutosh-chaubey01
