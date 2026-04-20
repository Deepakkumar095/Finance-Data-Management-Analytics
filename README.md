# Finance Data Management & Analytics

"A backend system that helps manage income and expense data with secure login and role-based access. Admin controls all data, while users can view their own financial dashboard with insights and analytics."

---

## 🚀 Features

- 🔐 JWT Authentication (Login / Signup)
- 🛡️ Role-Based Access Control (Admin, Analyst, Viewer)
- 📊 Dashboard Analytics (Income, Expense, Balance)
- 📈 Advanced Insights:
  - Category-wise breakdown
  - Monthly trends
  - Top spending categories
  - Recent transactions
- 🔍 Filtering (type, category, date range)
- ✅ Input Validation using Joi
- ⚠️ Global Error Handling
- 🧱 Clean Architecture (Controller → Service → Model)

  ---

## 🧠 Roles & Permissions

| Role     | Access |
|----------|--------|
| Admin    | Full CRUD + All Data |
| Analyst  | View All Data + Insights |
| Viewer   | View Own Data Only |

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Joi Validation

---
```
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── services/
│
├── models/
│
├── routes/
│
├── middleware/
│
├── validators/ 
│
├── utils/
│
├── app.js        
├── server.js    
│
├── .env
├── .gitignore
└── package.json
```

## 🔌 API Endpoints

### 🔐 Auth
- POST `/api/signup`
- POST `/api/login`
- POST `/api/logout`

### 📁 Records
- POST `/api/records/add-record` (Admin only)
- GET `/api/records/get-records`
- PUT `/api/records/update-record/:id` (Admin only)
- DELETE `/api/records/delete-record/:id` (Admin only)

### 📊 Dashboard
- GET `/api/dashboard`

---

## 🔄 How It Works

1. User logs in → JWT token generated  
2. Middleware verifies user  
3. Role-based access applied  
4. Data filtered based on user role  
5. Aggregation used for dashboard analytics  

---

## 🚧 Frontend Status
Status: In Progress (Frontend under development)
Frontend is currently under development.
Backend APIs are fully functional and tested using Thunder Client.

