# Finance Data Management & Analytics

"A Platform where it helps manage income and expense data with secure login and role-based access. Admin controls all data, while users can view their own dashboard, data records and analyst view financial dashboard with insights and analytics."

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
- React.js
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

#Screenshot
##Dashboard
<img width="1354" height="606" alt="image" src="https://github.com/user-attachments/assets/11087d8f-b8e8-44b9-84fb-064b47ccaae0" />
##Records
<img width="1328" height="615" alt="Screenshot 2026-04-26 233529" src="https://github.com/user-attachments/assets/23b19993-0436-437e-95f3-b79f0080f558" />
## Analytics:
<img width="1339" height="618" alt="Screenshot 2026-04-26 233555" src="https://github.com/user-attachments/assets/81f85c71-2a2d-4f50-8215-ac0bc88febcc" />
<img width="1330" height="603" alt="Screenshot 2026-04-26 233613" src="https://github.com/user-attachments/assets/e8af0973-5234-4f14-8e0f-27885be9a9a1" />

## User Management:
<img width="1317" height="609" alt="Screenshot 2026-04-26 233631" src="https://github.com/user-attachments/assets/d6ec752b-3ca5-45f8-bb12-7282725e88dc" />

