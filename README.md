# 🌾 AgriRate - The Intelligent Farming Ecosystem

AgriRate is a comprehensive web application designed to empower Pakistani farmers with AI-driven market insights, real-time weather data, smart farming advice, and community collaboration tools.

## Backend Repository
![Click to navigate](https://github.com/Danyal-Rana/WIH-Backend)

## 🚀 Features Implemented

### Phase 1 - Core Functional Modules

#### 1. **Authentication & User Management**
- Secure login and registration system
- Role-based access control (Admin, Farmer, Expert)
- JWT token-based authentication
- Protected routes with role-based redirects
- Location: `/app/auth/login` and `/app/auth/register`

#### 2. **Admin Dashboard**
- Comprehensive analytics overview
- User management statistics
- Market rates management interface
- Content moderation tools
- Location: `/app/admin/dashboard`

#### 3. **Farmer Dashboard**
- Real-time market price overview
- Weather summary cards
- AI-generated smart advice
- Quick action buttons for key features
- Price trend visualizations
- Location: `/app/farmer/dashboard`

#### 4. **Market Rates Module**
- Browse and search crop prices
- Filter by category (Grain, Vegetable, Fruit) and region
- Interactive price cards with trend indicators
- 7-day price trend charts
- Compare multiple crops
- Location: `/app/farmer/market-rates`

#### 5. **Weather Intelligence Module**
- Real-time weather data for multiple cities
- Temperature, humidity, rainfall, and wind speed
- 5-day weather forecast
- Visual weather icons and conditions
- Weather-based farming advice
- Pakistan-wide weather overview
- Location: `/app/farmer/weather`

#### 6. **Smart Farmer Advice Module**
- AI-powered farming recommendations
- Context-aware advice (weather, market, crop health)
- Confidence scores for each recommendation
- Voice assistant interface (KhetBot) - UI ready
- Advice history with categorization
- Location: `/app/farmer/advice`

#### 7. **Community Forum**
- Create, read, and browse forum posts
- Category-based filtering
- Like and comment system
- User profiles and avatars
- Search functionality
- Multilingual support ready
- Location: `/app/forum`

#### 8. **Live Baithak (Chat Rooms)**
- Real-time chat interface
- Multiple themed chat rooms
- Active user count display
- Voice and audio controls (UI ready)
- Message history
- Socket.io integration ready
- Location: `/app/baithak`

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form (ready)
- **Validation**: Zod (ready)
- **Real-time**: Socket.io Client (ready)

### Design System
- **8pt Grid System** for consistent spacing
- **CSS Variables** for theming
- **Dark Mode Support** via CSS variables
- **Accessible Components** with ARIA attributes
- **Responsive Design** mobile-first approach

## 📁 Project Structure

```
agriRate/
├── app/
│   ├── admin/
│   │   └── dashboard/          # Admin dashboard
│   ├── auth/
│   │   ├── login/              # Login page
│   │   └── register/           # Registration page
│   ├── farmer/
│   │   ├── dashboard/          # Farmer dashboard
│   │   ├── market-rates/       # Market rates module
│   │   ├── weather/            # Weather module
│   │   └── advice/             # Smart advice module
│   ├── forum/                  # Community forum
│   ├── baithak/                # Live chat rooms
│   ├── components/
│   │   ├── charts/             # Chart components
│   │   ├── shared/             # Shared components
│   │   ├── ui/                 # UI components
│   │   ├── ModernButton.tsx
│   │   ├── ModernCard.tsx
│   │   └── ModernInput.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts       # Axios client
│   │   │   └── endpoints.ts    # API endpoints
│   │   ├── context/
│   │   │   └── AuthContext.tsx # Auth context
│   │   └── utils/
│   │       └── format.ts       # Utility functions
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
└── package.json
```

## 🎨 Design System

### Color Palette
- **Primary**: Emerald green (#01411c)
- **Success**: Green tones
- **Warning**: Amber/Orange
- **Error**: Red
- **Info**: Blue
- **Neutral**: Stone/Gray scale

### Components
All components follow the design system:
- `ModernButton` - Primary, secondary, ghost, destructive variants
- `ModernCard` - Elevated, outlined, glass variants
- `ModernInput` - Text inputs with icons and validation
- `Select` - Dropdown selections
- `Textarea` - Multi-line text input
- `Modal` - Customizable modal dialogs
- `Table` - Data tables with sorting
- `Badge` - Status badges
- `LoadingSpinner` - Loading states

### Charts
- `PriceTrendChart` - Line chart for price trends
- `CompareCropsChart` - Multi-line comparison chart
- `StatsCard` - Statistical cards with trends

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## 🔌 API Integration

The application is configured to work with a backend API. All API endpoints are defined in `/app/lib/api/endpoints.ts`:

- **Authentication**: `/api/v1/auth/*`
- **Market Rates**: `/api/v1/market/*`
- **Weather**: `/api/v1/weather/*`
- **Advice**: `/api/v1/advice/*`
- **Forum**: `/api/v1/forum/*`
- **Baithak**: `/api/v1/baithak/*`

### Mock Data
Currently using mock data for demonstration. Replace with actual API calls by connecting to the backend.

## 👥 User Roles

### Admin
- Access to admin dashboard
- Manage market rates
- Manage users and content
- View analytics

### Farmer
- Access to farmer dashboard
- View market rates and trends
- Check weather forecasts
- Receive smart advice
- Participate in forum and chat

### Expert (Future)
- Provide verified advice
- Moderate forum content

## 🌐 Routing

- `/` - Homepage
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/admin/dashboard` - Admin dashboard (protected)
- `/farmer/dashboard` - Farmer dashboard (protected)
- `/farmer/market-rates` - Market rates (protected)
- `/farmer/weather` - Weather (protected)
- `/farmer/advice` - Smart advice (protected)
- `/forum` - Community forum (protected)
- `/baithak` - Live chat rooms (protected)

## 🔐 Authentication Flow

1. User logs in via `/auth/login`
2. JWT token stored in localStorage
3. `AuthContext` manages auth state
4. Protected routes check authentication
5. Role-based redirects to appropriate dashboard

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Sidebar**: Collapsible on mobile
- **Cards**: Stack vertically on mobile

## 🌍 Multilingual Support (Ready)

The application is designed to support:
- English (en)
- Urdu (ur)
- Roman Urdu (roman_ur)

Language type is defined in all data models. UI implementation pending.

## 🎯 Future Enhancements

### Phase 2 Features
1. **AI Market Forecaster** - Price predictions
2. **Farm Health Visualizer** - Crop disease detection
3. **Knowledge Hub** - Educational content
4. **AgriMart** - E-commerce marketplace
5. **Multilingual UI** - Full translation support
6. **Voice Features** - Urdu voice input/output
7. **Notifications** - Real-time alerts
8. **Mobile App** - React Native version

## 🤝 Contributing

This is a hackathon project. Backend integration and additional features are in progress.

## 📄 License

Proprietary - AgriRate Team

## 👨‍💻 Development

### Commands

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## 🐛 Known Issues

- Backend API not yet connected (using mock data)
- Socket.io real-time features need backend
- Voice input/output features UI only
- Multilingual UI translation pending
- Image upload features pending

## 📞 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for Pakistani Farmers**
