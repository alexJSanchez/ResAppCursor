# ResApp - Residential Property Management System

A full-stack web application for managing residential properties with user authentication and admin features.

## Features

- **User Authentication**
  - Secure login and registration
  - Password requirements (min 3 chars, must include number and symbol)
  - JWT-based authentication
  - Protected routes

- **Admin Dashboard**
  - User management (view, edit roles, delete users)
  - Real-time user data display
  - Role-based access control

- **Residential Property Management**
  - Detailed property listings
  - Property search and filtering
  - Property details including:
    - Address and location
    - Price and specifications
    - Property type and description

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- Emotion for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT for authentication

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ResAppCursor
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file with:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

## Database Management

### User Management
- Create admin user:
  ```bash
  cd backend
  npm run create-admin
  ```
- List all users:
  ```bash
  npm run list-users
  ```

### Residential Data
- Insert sample residential data:
  ```bash
  npm run insert-residential
  ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

### Residential
- `GET /api/residential` - Get all properties
- `POST /api/residential` - Add new property
- `GET /api/residential/:id` - Get property details
- `PUT /api/residential/:id` - Update property
- `DELETE /api/residential/:id` - Delete property

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Role-based access control
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For any queries or support, please contact the project maintainers. 