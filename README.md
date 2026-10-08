# ✍️ Signature Injection Backend

Backend API for my **Signature Injection** project.

This backend handles the server-side functionality of the application, including API routes, data models, and utility functions.

---

## ✨ Features

- ✍️ Signature Injection backend
- 🔗 REST API
- 📦 MongoDB database support
- 🛣️ API routes
- 🗃️ Database models
- 🛠️ Utility functions
- 🚀 Vercel deployment support

---

## 🛠️ Technologies Used

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 🧩 Mongoose
- 🌐 REST API
- ▲ Vercel
- 📦 npm

---

## 📂 Project Structure

```text id="q5j7s1"
event_Backend/
│
├── 📁 models/
├── 📁 routes/
├── 📁 utils/
│
├── 📄 index.js
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 vercel.json
├── 📄 .gitignore
└── 🖼️ wg.png
```

---

## 🔄 How It Works

```text id="d8x3k2"
Frontend
   ↓
Backend API
   ↓
Routes
   ↓
Models / Database
   ↓
Response
   ↓
Frontend
```

The frontend communicates with the backend through API endpoints.  
The backend processes the request and works with the database where required.

---

## ⚙️ Setup

### Clone Repository

```bash id="a2p8k4"
git clone https://github.com/Karans2005/event_Backend.git
```

### Go to Project Folder

```bash id="m4z9t1"
cd event_Backend
```

### Install Dependencies

```bash id="r6c1v7"
npm install
```

### Run Server

```bash id="p3h8n5"
node index.js
```

---

## 🔐 Environment Variables

Create a `.env` file and add your database/configuration values.

```env id="w7k2d6"
MONGO_URI=your_mongodb_connection_string
```

Keep your actual credentials private and don't upload them to GitHub.

---

## 🚀 Deployment

The backend is configured for deployment using **Vercel**.

The repository contains:

```text id="e5n1x8"
vercel.json
```

for deployment configuration.

---

## 👨‍💻 Author

**Harsh Kumar Sahu**

MERN Stack Developer 🚀

---

⭐ If you like this project, feel free to give it a star!
