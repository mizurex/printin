# PrintIn - Full-Stack Printing Service Platform

A modern, full-stack e-commerce printing platform built with Next.js 14, featuring real-time order management, payment processing, and delivery coordination.

![Project Banner](https://via.placeholder.com/800x400/026766/ffffff?text=PrintIn+Platform)

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management for order flow

### Backend
- **Next.js API Routes** - Serverless backend functions
- **Prisma ORM** - Type-safe database operations
- **PostgreSQL** - Robust relational database
- **NextAuth.js** - Authentication solution


## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+ and npm/yarn
PostgreSQL database
Google Cloud Console project
Stripe account
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/printin.git
cd printin
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# Database
DATABASE_URL="your-postgresql-url"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"

# Admin
ADMIN_EMAIL="your-admin-email@example.com"
```

4. **Database Setup**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔑 Key Features Deep Dive

### Order Flow Architecture
The multi-step order process is built with Zustand for state management:
1. **File Upload** - Secure file handling with validation
2. **Print Options** - Dynamic option selection with real-time updates
3. **Service Selection** - Delivery vs pickup with map integration
4. **Checkout** - Stripe payment with order confirmation

### Database Design
- **Users**: OAuth profiles with role management
- **Orders**: Complete order lifecycle tracking
- **Files**: Secure file metadata storage
- **Stores**: Pickup location management

### Security Implementation
- Input validation with TypeScript
- SQL injection prevention via Prisma
- Secure file upload handling
- Environment variable protection
- OAuth token management

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.


### Production Considerations
- Environment variables configured in Vercel dashboard
- Database hosted on production PostgreSQL instance
- CDN optimization for static assets
- Error monitoring and logging

## 🎯 What This Project Demonstrates

### Technical Skills
- **Full-Stack Development**: End-to-end application architecture
- **API Design**: RESTful endpoints with proper error handling
- **Database Management**: Complex relationships and data modeling
- **Payment Processing**: Secure financial transaction handling
- **Authentication**: OAuth implementation and session management
- **File Handling**: Upload, validation, and storage systems
- **Third-Party Integration**: Multiple API integrations (Stripe, Google, Maps)

