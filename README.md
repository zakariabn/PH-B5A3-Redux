# 📚 Library Management System

A modern, full-stack library management system built with React, TypeScript, and Redux Toolkit Query. This application provides a comprehensive solution for managing books, borrowing operations, and user interactions in a library environment.

## ✨ Features

### 🎯 Core Functionality

- **Book Management**: Complete CRUD operations for books
- **Borrowing System**: Track book borrowings with due dates
- **Pagination**: Efficient data loading with paginated book lists
- **Real-time Updates**: Automatic UI updates using RTK Query cache invalidation
- **Responsive Design**: Modern UI that works on all devices

### 📖 Book Operations

- **View Books**: Browse all books with pagination
- **Add Books**: Create new book entries with detailed information
- **Edit Books**: Update existing book details
- **Delete Books**: Remove books from the system
- **Book Availability**: Track book copies and availability status

### 🔄 Borrowing System

- **Borrow Books**: Check out books with quantity and due date
- **Borrow Summary**: View all borrowing activities
- **Availability Tracking**: Automatic updates when books are borrowed
- **Due Date Management**: Track when books need to be returned

### 🎨 User Interface

- **Modern Design**: Clean, intuitive interface using shadcn/ui components
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Toast Notifications**: User-friendly feedback for all operations
- **Loading States**: Smooth loading experiences throughout the app

## 🛠️ Technology Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components

### State Management

- **Redux Toolkit** - Predictable state management
- **RTK Query** - Powerful data fetching and caching
- **React Redux** - React bindings for Redux

### Form Handling & Validation

- **React Hook Form** - Performant forms with minimal re-renders
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Integration between React Hook Form and Zod

### Routing & Navigation

- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Development Tools

- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
library-management-client/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Shared components (Loading, etc.)
│   │   ├── features/      # Feature-specific components
│   │   │   ├── books/     # Book-related components
│   │   │   └── borrow/    # Borrowing components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # shadcn/ui components
│   ├── lib/               # Utility libraries
│   ├── pages/             # Page components
│   │   ├── auth/          # Authentication pages
│   │   ├── book/          # Book management pages
│   │   ├── borrow/        # Borrowing pages
│   │   └── Home/          # Home page
│   ├── redux/             # Redux store and slices
│   │   ├── features/      # Feature-specific Redux logic
│   │   │   ├── books/     # Book API and slice
│   │   │   └── borrow/    # Borrow API
│   │   ├── hooks.ts       # Typed Redux hooks
│   │   └── store.ts       # Redux store configuration
│   ├── routes/            # Route definitions
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

- `VITE_BASE_API_URL`: Your backend API base URL

### API Endpoints

The application expects the following API endpoints:

#### Books

- `GET /books?page={page}&limit={limit}` - Get paginated books
- `GET /books/{id}` - Get single book
- `POST /books` - Create new book
- `PUT /books/{id}` - Update book
- `DELETE /books/{id}` - Delete book

#### Borrowing

- `GET /borrow` - Get borrow summary
- `POST /borrow` - Create new borrow

## 🔒 Security Considerations

- **Input Validation**: Client-side validation with Zod
- **Type Safety**: TypeScript prevents runtime errors
- **Error Boundaries**: Graceful error handling
- **XSS Prevention**: Safe rendering of user input

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Redux Toolkit** for excellent state management
- **Vite** for fast development experience
- **Tailwind CSS** for utility-first styling

**Built with ❤️ using modern web technologies**
