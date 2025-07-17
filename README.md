
# OMVAD – Software Developer Internship Assignment

This repository contains my submission for the Software Developer Internship assignment at OMVAD. The project demonstrates a full-stack web application with proper UI/UX, API integration, and caching mechanisms.

## 🚀 Features

- Full-stack MERN application (MongoDB, Express, React, Node.js)
- Responsive and clean UI using TailwindCSS
- RESTful APIs for backend operations
- Authentication and authorization
- **Redis caching implemented for performance optimization**
- Error handling and loading states
- Live demo hosted on Vercel / Render / Railway

## ⚙️ Tech Stack

- **Frontend**: React.js, TailwindCSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Caching**: **Redis**
- Deployment: Vercel (Frontend), Render/Railway (Backend)

---

## 🧠 Redis Integration

To optimize performance and reduce unnecessary database queries, **Redis** has been integrated into the backend.

### 🔧 Setup

1. Make sure Redis is installed and running locally or use a cloud Redis service like Redis Cloud or Upstash.
2. In the backend `.env` file, include:
```

REDIS\_URL=redis\://localhost:6379

````

### 📦 Installation

```bash
npm install redis
````

### 🛠️ Usage Example

```js
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.connect();

const cacheKey = `user:${userId}`;
const cachedUser = await redisClient.get(cacheKey);

if (cachedUser) {
  return res.status(200).json(JSON.parse(cachedUser));
} else {
  const user = await User.findById(userId);
  await redisClient.set(cacheKey, JSON.stringify(user), {
    EX: 3600 // 1 hour cache
  });
  return res.status(200).json(user);
}
```

### ✅ Benefits

* Reduces latency for frequent data requests
* Minimizes load on MongoDB
* Improves overall response times

---

## 📂 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/prateek-007/your-repo-name.git

# Navigate to backend folder
cd backend
npm install
npm run dev

# Navigate to frontend folder
cd ../frontend
npm install
npm run dev
```

---

## 🔗 Live Demo

* **Frontend**: [https://your-frontend-link.com]([https://link-saver-drab.vercel.app])
