# ResApp - Restaurant Management Application

A full-stack web application for restaurant management with user authentication and admin capabilities.

## Version History

### Version 1.0.0 (March 2024)
- Initial release
- Features:
  - User Authentication (Login/Register/Logout)
  - Role-based Access Control (User/Admin)
  - Admin Dashboard with User Management
  - MongoDB Database Integration
  - RESTful API Backend
  - Material-UI Frontend
- Technical Stack:
  - Frontend: React, Material-UI, Emotion
  - Backend: Node.js, Express, MongoDB
  - Authentication: JWT, bcrypt
  - Database: MongoDB Atlas

## Features

- User Authentication (Login/Register/Logout)
- Role-based Access Control (User/Admin)
- Admin Dashboard for User Management
- Secure Password Requirements
- MongoDB Database Integration
- RESTful API Backend
- Modern React Frontend with Material-UI

## Tech Stack

### Frontend
- React
- Material-UI
- Emotion (for styled components)
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt for Password Hashing

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ResAppCursor
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Admin Functionality

### Creating the Initial Admin User

To create the initial admin user, run:
```bash
cd backend
npm run create-admin
```

Default admin credentials:
- Email: admin@example.com
- Password: Admin123!

### Admin Dashboard Features

1. **User Management**
   - View all registered users
   - Change user roles (User/Admin)
   - Delete users

2. **Access Control**
   - Only users with admin role can access the admin dashboard
   - Protected API endpoints with admin middleware

### Password Requirements

All passwords must meet the following criteria:
- Minimum 3 characters
- At least one number
- At least one special character (!@#$%^&*(),.?":{}|<>)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Admin (Protected)
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Protected API routes
- Secure password validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

### Authentication Features

1. **Login**
   - Email and password authentication
   - JWT token generation
   - Role-based access control

2. **Registration**
   - Secure password requirements
   - Email and username validation
   - Automatic role assignment (default: user)

3. **Logout**
   - Secure session termination
   - Automatic redirection to home page
   - Token and user data removal
   - UI state refresh 