# Backend Implementation Guide

## Files Created/Updated

### Core Server Files
- `index.js` - Main server entry point with Express setup
- `package.json` - Dependencies (express, oracledb, bcrypt, jsonwebtoken, joi, cors, helmet, morgan)

### Configuration
- `src/config/database.js` - Oracle DB connection pool
- `.env` - Environment variables

### Routes
- `src/routes/tasksRoutes.js` - Tasks endpoints
- `src/routes/authRoutes.js` - Auth endpoints

### Controllers
- `src/controllers/taskController.js` - Task business logic (list, create, get, update, delete)
- `src/controllers/authController.js` - Auth logic (register, login)

### Models
- `src/models/taskModel.js` - Task DB queries
- `src/models/userModel.js` - User DB queries

### Middleware
- `src/middleware/validate.js` - Input validation with Joi
- `src/middleware/errorHandler.js` - Global error handler

### Database
- `schema.sql` - Oracle table creation and sample data
- `test-db.js` - DB connection test script

---

## Step-by-Step Implementation

### 1. Install Dependencies
```powershell
cd "d:\Full Stack Projects\smart-habit-tracker\backend"
npm install express oracledb dotenv bcrypt jsonwebtoken joi cors helmet morgan
npm install -D nodemon
```

### 2. Update package.json scripts
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test:db": "node test-db.js"
  }
}
```

### 3. Set up .env file
```
PORT=4000
ORACLE_USER=system
ORACLE_PASSWORD=OraclePassword123
ORACLE_CONNECTION_STRING=localhost:1521/XEPDB1
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 4. Start Oracle (using Docker)
```powershell
docker run -d `
  --name oracle-xe `
  -p 1521:1521 `
  -p 5500:5500 `
  -e ORACLE_PWD=OraclePassword123 `
  gvenzl/oracle-xe:latest
```

Wait 2-3 minutes for Oracle to start. Check status:
```powershell
docker logs oracle-xe
```

### 5. Create Database Schema
Connect to Oracle using SQL*Plus, SQL Developer, or DBeaver and run `schema.sql`:
```sql
-- Copy contents of schema.sql and execute
CREATE TABLE users (...);
CREATE TABLE tasks (...);
INSERT INTO users ...;
INSERT INTO tasks ...;
COMMIT;
```

### 6. Test Database Connection
```powershell
npm run test:db
```

Expected output: `✓ Oracle connection successful!`

### 7. Start the Server
```powershell
npm run dev
```

Expected output:
```
✓ Database pool initialized
✓ Server listening on port 4000
✓ Environment: development
```

---

## API Endpoints

### Tasks
- `GET /api/tasks` - List tasks with filters (search, priority, state)
- `POST /api/tasks` - Create a task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Health Check
- `GET /api/health` - Server health status

---

## Testing Endpoints (curl examples)

### Create Task
```powershell
curl -X POST http://localhost:4000/api/tasks `
  -H "Content-Type: application/json" `
  -d '{"title":"New Task","description":"desc","priority":"HIGH","state":"NEW"}'
```

### List Tasks
```powershell
curl "http://localhost:4000/api/tasks?search=exercise&priority=HIGH&state=NEW"
```

### Get Task
```powershell
curl http://localhost:4000/api/tasks/1
```

### Update Task
```powershell
curl -X PUT http://localhost:4000/api/tasks/1 `
  -H "Content-Type: application/json" `
  -d '{"state":"IN_PROGRESS"}'
```

### Delete Task
```powershell
curl -X DELETE http://localhost:4000/api/tasks/1
```

### Register User
```powershell
curl -X POST http://localhost:4000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"email":"user@example.com","password":"password123","name":"User"}'
```

### Login
```powershell
curl -X POST http://localhost:4000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"password"}'
```

---

## Troubleshooting

### Oracle Connection Error
- Ensure Docker is running: `docker ps`
- Check Oracle logs: `docker logs oracle-xe`
- Verify connection string in .env matches Oracle container

### Module Not Found
- Ensure all npm packages are installed: `npm install`
- Check node_modules folder exists

### Port Already in Use
- Change PORT in .env file
- Or kill process using port: `netstat -ano | findstr :4000`

---

## Next Steps

1. ✓ Backend API complete and tested
2. Connect frontend to backend API using axios
3. Add authentication middleware to protected routes
4. Add tests (Jest + Supertest)
5. Deploy to production
