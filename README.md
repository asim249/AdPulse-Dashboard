# 🚀 AdPulse - AI-Powered Campaign Management Dashboard

AdPulse is a full-stack web application designed to help digital marketing agencies manage campaigns and generate AI-powered creative briefs.

---

## 🌟 Key Features

- 🔐 **Secure Authentication**  
  JWT-based login and registration system.

- 📊 **Campaign Dashboard**  
  Visualize real-time campaign metrics such as Impressions, Clicks, and Spend.

- 🤖 **AI Creative Brief Generator**  
  Generate personalized marketing strategies using a multi-step form (Powered by OpenRouter / Gemini).

- ♻️ **Soft Delete System**  
  Campaigns are archived instead of permanently deleted, ensuring data safety.

- 📱 **Responsive UI**  
  Clean and modern interface optimized for all screen sizes.

---

## 🛠️ Tech Stack

| Category     | Technology |
|--------------|-----------|
| **Frontend** | React.js ⚛️, Tailwind CSS 🎨, Axios 🔄 |
| **Backend**  | Node.js 🟢, Express.js 🚂 |
| **Database** | MongoDB & Mongoose 🍃 |
| **Security** | JSON Web Token (JWT) 🔑 |
| **AI**       | OpenRouter API (Gemini 2.0 Flash) 🧠 |

---

## 🚀 Installation & Setup

Follow these steps to run the project locally:

### 1. Backend Setup

cd backend
npm install

---

# Create a .env file and add the following variables:

PORT=2000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_key

---

Start the backend server:

npm start

---

### 3. Frontend Setup

### 📁 Project Structure

backend/
 
 ├── controllers/    # Business logic

 ├── models/         # MongoDB schemas
 
 ├── routes/         # API endpoints
 
 ├── middleware/     # Authentication & security
 
 └── docs/           # Postman collection

frontend/
 
 └── src/
 
     ├── components/ # Reusable UI components 

---

### 📋 API Documentation

A Postman collection is included in the project.

Location:

/backend/docs/

---

### 🔌 Backend API Endpoints
🔐 Authentication
| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login and get JWT token |

### 📊 Campaigns

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| GET    | `/api/campaigns`     | Fetch all active campaigns       |
| DELETE | `/api/campaigns/:id` | Soft delete (archive a campaign) |

### 🤖 AI

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| POST   | `/api/ai/generate-brief` | Generate AI creative brief |

---

### 📝 Technical Decisions

# MongoDB

Chosen for its flexibility in handling AI-generated JSON data efficiently.

# Soft Delete

Implemented using a deleted_at timestamp to allow data recovery.

# OpenRouter (Gemini 2.0 Flash)

Used for fast and accurate AI-generated responses.

--- 


![ADPULSE DASHBOARD](./gif/Adpulse%20Dashboard.gif)

---

### 🧑‍💻 Developer

Developed by Asim Mir  
[GitHub: asim249](https://github.com/asim249)

---






