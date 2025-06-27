
# 📌 Full Stack URL Shortener Microservice with Frontend and Custom Logging Middleware

This project is a full-stack URL Shortener application developed as part of a Campus Hiring Evaluation Test. It follows a **microservice architecture**, has a **custom logging middleware**, and includes both **backend** (Node.js + Express) and **frontend** (React + Material UI).

---

## 📂 Project Directory Structure

```
project-root/
├── middleware/      # Shared reusable logging middleware
├── backend/         # Node.js Express URL Shortener Microservice
└── frontend/        # React.js Web App (Material UI based)
```

---

## 🚀 Features

### ✅ Middleware (Logging)

* Reusable custom logging module.
* Posts logs to external test log server.
* Validates `stack`, `level`, and `package` fields.
* Used by both backend and frontend.

### ✅ Backend Microservice

* RESTful API for URL shortening.
* Supports both auto-generated and custom shortcodes.
* URL expiry based on user-provided validity or defaults to 30 minutes.
* Redirection to long URLs.
* Detailed statistics per shortcode (click count, timestamps, source, location).
* Integrated with middleware for logging API calls and internal processes.

### ✅ Frontend (React + Material UI)

* Responsive web interface.
* Allows shortening of up to **5 URLs at once**.
* Input fields for URL, validity, and custom shortcode.
* Displays shortened links with expiry dates.
* Shows analytics/statistics per shortcode.
* Uses the same logging middleware (frontend-compatible version).

---

## 📌 Requirements Before Running

Make sure you have installed:

* Node.js (v16 or above recommended)
* npm (Node Package Manager)

---

## 🛠️ Setup Instructions

### 1. Middleware Setup (Shared Logger Module)

```bash
cd middleware
npm init -y
npm install axios
```

The middleware exposes a function:

```js
Log(stack, level, package, message)
```

This function sends structured log data to the test log server (`http://20.244.56.144/evaluation-service/logs`).

---

### 2. Backend Setup (Node.js Express Server)

```bash
cd ../backend
npm init -y
npm install express cors axios uuid
```

Then run:

```bash
node server.js
```

Backend runs at:
`http://localhost:5000`

#### 📌 Backend API Endpoints:

| Endpoint                | Method | Purpose                        |
| ----------------------- | ------ | ------------------------------ |
| `/shorturls`            | POST   | Create a new shortened URL     |
| `/:shortcode`           | GET    | Redirect to original long URL  |
| `/shorturls/:shortcode` | GET    | Get statistics for a shortcode |

---

#### 📌 Backend Folder Structure:

```
backend/
├── routes/
│   └── shorturls.js
├── middleware/
│   └── requestLogger.js
├── server.js
└── package.json
```

---

### 3. Frontend Setup (React + Material UI)

```bash
cd ../frontend
npm install
npm start
```

Frontend runs at:
`http://localhost:3000`

#### 📌 Frontend Pages:

| Page       | URL Path | Description                             |
| ---------- | -------- | --------------------------------------- |
| Shortener  | `/`      | Form for shortening URLs                |
| Statistics | `/stats` | Fetch and display stats for a shortcode |

---

#### 📌 Frontend Folder Structure (Key Files):

```
frontend/
├── src/
│   ├── components/
│   │   └── URLShortenerForm.js
│   │   └── StatsPage.js
│   ├── middleware/
│   │   └── logger.js
│   └── App.js
├── package.json
└── public/
```

---

## ✅ Logging Middleware Details

**Location:** `/middleware/logger.js`

### Expected Log Structure Sent to Test Server:

```json
{
  "stack": "backend",
  "level": "info",
  "package": "middleware",
  "message": "Incoming request: GET /shorturls"
}
```

### Allowed Values:

* **Stack:** `backend`, `frontend`
* **Level:** `debug`, `info`, `warn`, `error`, `fatal`
* **Package:**
  Backend packages: `cache`, `controller`, `cron_job`, `db`, `domain`, `handler`, `repository`, `route`, `service`
  Frontend packages: `api`, `component`, `hook`, `page`, `state`, `style`
  Both: `auth`, `config`, `middleware`, `utils`

---

## ✅ Handling Log Server 401 Error (Important Note)

During development, the external log server was returning:

```
401 Unauthorized
```

If an API key or authentication token is later provided by the evaluators, it should be added in the logger Axios headers like:

```js
const headers = {
  Authorization: `Bearer YOUR_API_KEY`
};
```

For now, the logger **suppresses 401 errors during local development** to allow the app to run.

---

## ✅ Known Limitations

* **Data Persistence:**
  Currently uses **in-memory storage** in backend (Objects in Node.js).
  **If backend server restarts, data is lost.**

* **Geo-Location:**
  For simplicity, click location is hardcoded as `"India"`.
  (Real IP-based location lookup was outside test scope.)

* **401 Log API Errors:**
  As explained above.

---

## ✅ Technologies Used

| Layer         | Tech Stack                          |
| ------------- | ----------------------------------- |
| Middleware    | Node.js + Axios                     |
| Backend       | Node.js + Express + UUID            |
| Frontend      | React + Material UI + Axios         |
| Communication | REST APIs                           |
| Logging       | External HTTP-based Logging Service |

---

## ✅ Deployment & Running (Quick Summary)

```bash
# Setup middleware
cd middleware
npm install

# Start backend
cd ../backend
npm install
node server.js

# Start frontend
cd ../frontend
npm install
npm start
```

---


