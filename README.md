
# Link Saver

Link Saver is a full-stack web application that allows users to save, organize, and manage bookmarks with tags. Built with a React frontend and a Node.js/Express backend, it features a user-friendly interface with theme toggling (light/dark mode), drag-and-drop bookmark reordering, and tag-based organization. Redis is used to cache bookmarks for faster access and reduced database load.

---

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT.
- **Bookmark Management**:
  - Add bookmarks with URLs and comma-separated tags.
  - Optimistic updates for instant UI feedback.
  - Delete bookmarks directly from the list.
  - Drag-and-drop to reorder bookmarks, with order persisted in the backend.
- **Redis Caching**: Frequently accessed bookmarks are cached in Redis to reduce latency and load on MongoDB.
- **Theme Support**: Toggle between light and dark modes for a comfortable user experience.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Error Handling**: Graceful handling of API errors with user feedback.

---

## 🧰 Tech Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, **Redis**, Jina AI
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Backend (http://localhost:5000 for development)

---

## 📦 Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- MongoDB and Redis (via Docker or local installation)
- Jina AI API key for URL summaries

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/link-saver.git
cd link-saver
````

### 2. Backend Setup

```bash
cd backend
```

Create a `.env` file with the following:

```
MONGODB_URI=mongodb://mongo:27017/link-saver  
REDIS_URL=redis://redis:6379  
JWT_SECRET=your_jwt_secret_key  
PORT=5000  
JINA_API_KEY=your_jina_api_key  
```

> Replace `your_jwt_secret_key` with a secure secret.
> Get `your_jina_api_key` from Jina AI.

Install backend dependencies:

```bash
npm install
```

Start the backend with Docker (MongoDB + Redis):

```bash
docker-compose up -d
```

### 3. Frontend Setup

```bash
cd ../frontend
```

Install frontend dependencies:

```bash
npm install
```

Add a default favicon at:

```bash
frontend/public/default-favicon.png
```

Start the frontend:

```bash
npm start
```

> Runs on [http://localhost:3000](http://localhost:3000)

---

## 📌 Redis Caching

Redis is used to cache user bookmarks to reduce response times and database calls.

### Example Usage

```js
const cacheKey = `bookmarks:${userId}`;
const cached = await redisClient.get(cacheKey);

if (cached) {
  return res.json(JSON.parse(cached));
}

const bookmarks = await Bookmark.find({ user: userId });
await redisClient.set(cacheKey, JSON.stringify(bookmarks), { EX: 3600 }); // Cache for 1 hour

res.json(bookmarks);
```

### Benefits

* Improved API performance
* Reduced MongoDB load
* Faster response for frequent data access

---

## 🧪 Usage

### Login/Register

* Go to `http://localhost:3000/login` or `/register`
* Use credentials to access dashboard

### Add Bookmarks

* Enter a URL (e.g., `https://en.wikipedia.org/wiki/Artificial_intelligence`) and tags (e.g., `AI,Tech`)
* Submit to save bookmark (title/favicons are fetched later)

### Manage Bookmarks

* Drag and drop bookmarks to reorder
* Delete bookmarks via trash icon
* Switch between light and dark themes

---

## 📫 Test with Postman

### Add Bookmark

```
POST http://localhost:5000/api/bookmarks  
Authorization: Bearer <token>
```

```json
{
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence",
  "tags": ["AI", "Tech"]
}
```

### Get Bookmarks

```
GET http://localhost:5000/api/bookmarks  
Authorization: Bearer <token>
```

---

## 🛠 Troubleshooting

* **Bookmarks Not Saving**:
  Check `/api/bookmarks` request for 400/500 errors. Ensure Jina API key is correct and Docker containers are running.

* **Redis Not Caching**:
  Verify Redis is running (`docker ps`) and `REDIS_URL` is correct in `.env`.

* **Theme Issues**:
  Check `ThemeContext` and Tailwind classes (`bg-gray-900`, `text-gray-100`, etc.)

* **API Errors**:
  Use `docker logs <container_name>` for backend debugging.

