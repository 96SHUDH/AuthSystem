# 🔐 AuthSystem - Next.js Full Stack Authentication

A robust and secure full-stack authentication system built with **Next.js**, **TypeScript**, and **MongoDB**. This project features a complete user lifecycle management system including signup, login, email verification, and protected routes using middleware.

## 🚀 Tech Stack

- **Framework:** [Next.js 13+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **ORM:** [Mongoose](https://mongoosejs.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Email Service:** [Mailtrap](https://mailtrap.io/) (for testing email delivery)
- **Authentication:** JWT (JSON Web Tokens) with secure HTTP-only cookies

## ✨ Features

- **User Registration:** Secure signup with hashed passwords (bcryptjs).
- **Authentication:** User login with JWT token generation.
- **Email Verification:** Automated email dispatch using Mailtrap to verify user accounts.
- **Protected Routes:** `middleware.ts` implementation to protect private pages (e.g., Profile).
- **Dynamic Navbar:** Responsive UI that changes based on login/verification status.
- **Toasts:** Real-time success/error notifications using `react-hot-toast`.
- **Async Handling:** Robust error handling and loading states for better UX.

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone [https://github.com/yourusername/auth-system.git](https://github.com/yourusername/auth-system.git)
cd auth-system
```
