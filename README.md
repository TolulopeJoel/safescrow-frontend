# SafeScrow Frontend

A modern, secure escrow application built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with protected routes
- **Escrow Management**: Create, view, and manage escrow transactions
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript support for better development experience
- **Modern UI**: Clean, professional interface with Radix UI components

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Router v6** for routing
- **Axios** for API communication
- **Radix UI** for accessible components
- **Context API** for state management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd safescrow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── layout/       # Layout components (Header, Footer, etc.)
├── pages/            # Page components
├── services/         # API services
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── contexts/         # React contexts
└── App.tsx           # Main application component
```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🌐 API Configuration

The app is configured to connect to a backend API. Update the API URL in `src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  // ...
});
```

## 🔐 Authentication

The app uses JWT tokens stored in localStorage for authentication. Protected routes automatically redirect to the login page if the user is not authenticated.

## 📱 Responsive Design

The app is built with a mobile-first approach using Tailwind CSS. All components are responsive and work across different screen sizes.

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable component classes defined in `src/index.css`
- **Inter Font**: Modern, readable typography

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting service

## 📝 Development Guidelines

- Follow the existing TypeScript patterns
- Use Tailwind CSS classes for styling
- Create reusable components in the `components/ui` directory
- Implement proper error handling for API calls
- Add loading states for better UX

## 🔄 Next Steps

1. **Implement Pages**: Replace placeholder components with actual page implementations
2. **Add Navigation**: Create header/navigation components
3. **Form Validation**: Add proper form validation
4. **Error Handling**: Implement comprehensive error handling
5. **Testing**: Add unit and integration tests

## 📄 License

This project is licensed under the MIT License.
