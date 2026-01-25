# MannMitra - J&K Mental Wellbeing Platform

An culturally sensitive, AI-powered mental health support platform designed specifically for students in Jammu & Kashmir.

## � Key Features

### 1. Professional Architecture (MERN Monorepo)
- **Monorepo Structure**: Separation of concerns with `/client` (React) and `/server` (Express) managed by a root orchestrator.
- **Service-Repository Pattern**: Backend logic is split into Controllers, Services, and Models for scalability.
- **Unified API Handling**: Standardized `axiosInstance` with global interceptors for security and error handling.

### 2. Clinical-Grade Security
- **RBAC (Role-Based Access Control)**: Distinct roles for **User**, **Professional**, and **Admin**.
- **HttpOnly Cookies**: JWT tokens are stored insecurely in cookies (preventing XSS attacks) rather than localStorage.
- **Data Privacy**: Chat logs are automatically encrypted and have a **30-day Time-To-Live (TTL)** to ensure long-term confidentiality.
- **Anonymity**: Users can participate using randomized Aliases.

### 3. Intelligent Chatbot (Low-Latency)
- **Real-Time Communication**: Powered by **Socket.io** for zero-latency messaging, crucial for varying internet speeds in J&K.
- **NLP Engine**: Uses `natural` library to detect intents (Anxiety, Depression, Greeting).
- **Safety Sentinel**: A dedicated middleware scans for high-risk keywords (e.g., "suicide", "harm") and triggers immediate emergency protocols.

### 4. Localization & Resilience
- **Multilingual Support**: Chatbot and Resources support English, Urdu, and Kashmiri contexts.
- **Low-Bandwidth Optimization**: APIs return minimal JSON payloads.
- **Offline-Ready Strategy**: Critical resources are cached.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### Installation
Run the following command from the **root** directory to install dependencies for both User Interface and API:

```bash
npm run install-all
```

### Running the App
To start both Frontend and Backend concurrently:

```bash
npm run dev
```

- **Frontend**: http://localhost:8080 or http://localhost:5173
- **Backend API**: http://localhost:5000

## � Project Structure

```
/
├── client/                 # React Frontend (Vite + Shadcn/UI)
│   ├── src/api/            # Centralized Axios Instance
│   └── src/pages/          # Full Views (Login, Chat, etc.)
├── server/                 # Node/Express Backend
│   ├── models/             # Mongoose Schemas (User, Chat, Professional)
│   ├── services/           # Business Logic (Chatbot NLP)
│   └── middleware/         # Auth & RBAC Security
└── package.json            # Orchestration Scripts
```

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Shadcn/UI, Axios, Socket.io-client.
- **Backend**: Express.js, Mongoose, Socket.io, Natural (NLP), BcryptJS.
- **Security**: Helmet, XSS-Clean, HPP, Rate Limiting, HttpOnly Cookies.
