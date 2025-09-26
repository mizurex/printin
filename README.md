# 🖨️ PrintIn - Full-Stack Printing Service Platform

A modern, full-stack e-commerce printing platform built with Next.js 14, featuring real-time order management, payment processing, and delivery coordination.

![Project Banner](https://via.placeholder.com/800x400/026766/ffffff?text=PrintIn+Platform)

## ✨ Features

### 🔐 Authentication & User Management
- Google OAuth integration with NextAuth.js
- Secure session management with JWT
- Role-based access control (Admin/User)
- Persistent user profiles with order history

### 📄 Smart Order Management
- **Multi-step Order Wizard**: Intuitive file upload → print options → service selection → checkout flow
- **File Upload System**: Secure file handling with type validation and size limits
- **Dynamic Pricing**: Real-time price calculation based on options and quantity
- **Order Tracking**: Complete order lifecycle management

### 🎨 Print Customization
- **Color Options**: Black & White / Full Color printing
- **Paper Settings**: Single-sided / Double-sided printing
- **Finishing Options**: Binding and lamination services
- **Quantity Selection**: Dynamic pricing with bulk options

### 🚚 Flexible Delivery System
- **Store Pickup**: Interactive map with 25+ locations across India
- **Home Delivery**: Complete address management with date selection
- **Real-time Location**: Click-to-select pickup points with reverse geocoding

### 💳 Payment Integration
- **Stripe Checkout**: Secure payment processing
- **Multiple Payment Methods**: Cards, digital wallets
- **Order Confirmation**: Automated receipt generation

### 📱 Modern UI/UX
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Interactive Components**: Maps, forms, file uploads
- **Loading States**: Smooth user experience with proper feedback
- **Error Handling**: Graceful error management and user guidance

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

### Integrations
- **Stripe** - Payment processing
- **Google OAuth** - Social authentication
- **Pigeon Maps** - Interactive mapping
- **Nominatim** - Reverse geocoding

### DevOps & Tools
- **Vercel** - Deployment and hosting
- **ESLint** - Code linting
- **Git** - Version control

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

## 📁 Project Structure

```
printin/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── api/            # API routes
│   │   ├── dashboard/      # Admin dashboard
│   │   ├── order/          # Order flow pages
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable components
│   │   ├── order/          # Order flow components
│   │   └── ui/             # UI components
│   └── lib/                # Utilities and configurations
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── auth.ts                 # Authentication configuration
```

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

**Live Demo**: [your-deployment-url.vercel.app](https://your-deployment-url.vercel.app)

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

### Software Engineering Practices
- **TypeScript**: Type-safe development
- **Component Architecture**: Reusable, maintainable code
- **State Management**: Complex application state handling
- **Error Handling**: Graceful error management
- **Responsive Design**: Cross-device compatibility
- **Security**: Input validation and data protection

## 🔮 Future Enhancements

- [ ] Real-time order status updates with WebSockets
- [ ] Email notification system
- [ ] Advanced admin dashboard with analytics
- [ ] Bulk order management
- [ ] PDF generation for receipts
- [ ] Integration with shipping providers
- [ ] Multi-language support
- [ ] Advanced file preview system

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

**Your Name** - [your.email@example.com](mailto:your.email@example.com)

**Project Link**: [https://github.com/yourusername/printin](https://github.com/yourusername/printin)

**Live Demo**: [https://your-deployment.vercel.app](https://your-deployment.vercel.app)

---

*Built with ❤️ using Next.js, TypeScript, and modern web technologies*

## 📊 Project Stats

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/printin)
![GitHub language count](https://img.shields.io/github/languages/count/yourusername/printin)
![GitHub top language](https://img.shields.io/github/languages/top/yourusername/printin)