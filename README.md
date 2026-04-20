# 💰 Finance Dashboard Backend

A role-based Finance Dashboard Backend built using Node.js, Express.js, and MongoDB.  
It provides secure APIs for managing financial records with role-based access control and analytics.

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
