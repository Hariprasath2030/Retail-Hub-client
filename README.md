# Smart Retail Hub

A comprehensive retail management system built with modern web technologies to streamline inventory management, customer engagement, and sales operations.

## 🚀 Project Overview

Smart Retail Hub is a full-stack web application designed to revolutionize retail business operations through automated systems. It provides tools for inventory optimization, enhanced customer experience, and sales growth tracking.

## ✨ Key Features

### Admin Features
- **Dashboard Analytics** - Real-time inventory tracking with circular progress indicators
- **Product Management** - Add, edit, delete products with image upload
- **Inventory Control** - Stock level monitoring with low-stock alerts
- **Barcode Scanning** - Product identification and billing system
- **Bill Generation** - PDF receipt generation and printing
- **User Management** - Admin authentication and authorization

### Customer Features
- **Product Catalog** - Browse available products with descriptions
- **Shopping Lists** - Create and manage product lists
- **PDF Export** - Download shopping lists as PDF
- **Real-time Stock** - View current product availability
- **User Authentication** - Secure customer login system

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18.3.1** - Modern UI library with hooks
- **Vite 5.4.10** - Fast build tool and development server
- **React Router DOM 7.0.2** - Client-side routing
- **Tailwind CSS 3.4.14** - Utility-first CSS framework
- **Ant Design 5.21.6** - Professional UI component library

### State Management & Context
- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic for authentication and data fetching

### UI/UX Libraries
- **Lucide React 0.456.0** - Modern icon library
- **FontAwesome 6.7.1** - Icon toolkit
- **React Circular Progressbar 2.1.0** - Animated progress indicators
- **React Loader Spinner 6.1.6** - Loading animations

### PDF & Document Generation
- **jsPDF 2.5.2** - Client-side PDF generation
- **html2pdf.js 0.10.2** - HTML to PDF conversion

### Barcode & Scanning
- **Quagga 0.12.1** - Barcode scanning library
- **use-scan-detection 0.2.3** - Barcode detection hooks

### HTTP & API Integration
- **Axios 1.7.7** - HTTP client for API requests
- **Fetch API** - Native browser API for network requests

### Development Tools
- **ESLint 9.13.0** - Code linting and quality
- **PostCSS 8.4.47** - CSS processing
- **Autoprefixer 10.4.20** - CSS vendor prefixing

### Backend Integration
- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Cloudinary** - Image upload and management

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd smart-retail-hub
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_URL=https://retail-hub-server.onrender.com
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 4. Development Server
```bash
# Start development server
npm run dev

# Or with yarn
yarn dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Dashboard.jsx    # Admin dashboard
│   ├── Customer.jsx     # Customer interface
│   ├── BarcodeScanner.jsx
│   ├── BillDetails.jsx
│   └── ...
├── Auth/                # Authentication components
│   ├── Login.jsx
│   ├── Register.jsx
│   └── form.css
├── hooks/               # Custom React hooks
│   ├── useLogin.jsx
│   ├── useSignup.jsx
│   └── customerLogin.jsx
├── contexts/            # React Context providers
│   ├── AuthContext.jsx
│   └── CustomerContext.jsx
├── assets/              # Static assets
│   ├── css/
│   └── images/
└── App.jsx              # Main application component
```

## 🔧 Configuration Files

### Vite Configuration (`vite.config.js`)
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://retail-hub-server.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/data'),
            },
        },
    },
});
```

### Tailwind Configuration (`tailwind.config.js`)
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🔐 Authentication System

### Admin Authentication
- Email and password-based login
- JWT token management
- Protected routes with authentication guards
- Session persistence with localStorage

### Customer Authentication
- Separate customer login system
- User registration with validation
- Role-based access control

## 📊 Key Components

### Dashboard Features
- **Circular Progress Indicators** - Visual stock level representation
- **Real-time Alerts** - Low stock notifications
- **Product Management** - CRUD operations
- **Responsive Design** - Mobile-friendly interface

### Barcode System
- **Product Scanning** - Quick product identification
- **Inventory Updates** - Automatic stock adjustments
- **Bill Generation** - Instant receipt creation

### PDF Generation
- **Receipt Printing** - Professional bill formatting
- **Shopping Lists** - Downloadable product lists
- **Custom Styling** - Branded document templates

## 🌐 API Integration

### Backend Endpoints
```
GET    /api/products              # Fetch all products
POST   /api/products              # Add new product
PUT    /api/products/:id          # Update product
DELETE /api/products/:id          # Delete product
GET    /api/productts?userId=:id  # Get product by userId
PATCH  /api/productts/decrement/:id # Decrement stock
```

### Authentication Endpoints
```
POST   /api/auth/signup           # Admin registration
POST   /api/auth/login            # Admin login
POST   /api/customer/customerSignup # Customer registration
POST   /api/customer/customerLogin  # Customer login
```

## 🎨 Styling & Design

### CSS Architecture
- **Tailwind CSS** - Utility-first styling
- **Custom CSS** - Component-specific styles
- **Responsive Design** - Mobile-first approach
- **Dark/Light Themes** - Consistent color schemes

### UI Components
- **Ant Design** - Professional component library
- **Custom Cards** - Product display components
- **Navigation** - Sidebar and navbar systems
- **Forms** - Validation and error handling

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile** - 320px and up
- **Tablet** - 768px and up
- **Desktop** - 1024px and up
- **Large Desktop** - 1440px and up

## 🚀 Deployment

### Build Process
```bash
# Install dependencies
npm install

# Create production build
npm run build

# The build files will be in the 'dist' directory
```

### Deployment Platforms
- **Netlify** - Static site hosting
- **Vercel** - Frontend deployment
- **GitHub Pages** - Free hosting option
- **AWS S3** - Cloud storage deployment

### Environment Variables for Production
```env
VITE_API_URL=https://your-production-api.com
VITE_CLOUDINARY_CLOUD_NAME=production_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=production_preset
```

## 🧪 Testing

### Available Scripts
```bash
npm run lint          # Run ESLint
npm run build         # Production build
npm run preview       # Preview production build
```

## 🔄 Development Workflow

1. **Feature Development**
   - Create feature branch
   - Implement component
   - Add styling
   - Test functionality

2. **Code Quality**
   - ESLint validation
   - Component optimization
   - Performance testing
   - Cross-browser compatibility

3. **Deployment**
   - Build optimization
   - Environment configuration
   - Production testing
   - Live deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Future Enhancements

- **Mobile App** - React Native implementation
- **Advanced Analytics** - Sales reporting dashboard
- **Multi-store Support** - Chain store management
- **Payment Integration** - Online payment processing
- **Inventory Forecasting** - AI-powered stock predictions
- **Customer Loyalty** - Rewards and points system

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Frontend Development** - React.js, UI/UX Design
- **Backend Development** - Node.js, MongoDB
- **DevOps** - Deployment and CI/CD

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Smart Retail Hub** - Revolutionizing retail operations with modern technology.