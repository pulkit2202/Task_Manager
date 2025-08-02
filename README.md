 # ✅  Task Manager

A fully-functional **Task Management Web App** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This application allows users to register, log in, create, edit, and manage tasks with features like PDF uploads, filtering, and pagination. The project is fully Dockerized for smooth deployment and local setup.

---

## 🚀 Features

* ✅ User Registration and Authentication (JWT-based)
* ✅ Create, Edit, Delete Tasks
* ✅ Upload up to 3 PDF files per task
* ✅ Download/view attached files
* ✅ Filter by Completed / Important tasks
* ✅ Pagination for task lists
* ✅ Recent Task View
* ✅ Responsive UI with React + Bootstrap
* ✅ Docker support for both frontend and backend

---

## 📁 Project Structure

```
mern-task/
├── client/               # React frontend
│   └── src/              # React components and logic
├── server/               # Node.js + Express backend
│   └── controllers/      # Task and user logic
│   └── models/           # Mongoose schemas
│   └── middleware/       # Auth & upload middleware
│   └── uploads/          # Stores uploaded PDF files
├── .env                  # Environment variables
├── docker-compose.yml    # Docker multi-container config
├── README.md             # Project documentation
```

---

## 🪰 Tech Stack

| Technology | Description        |
| ---------- | ------------------ |
| MongoDB    | NoSQL database     |
| Express.js | Backend framework  |
| React.js   | Frontend framework |
| Node.js    | Backend runtime    |
| JWT        | Authentication     |
| Multer     | PDF file upload    |
| Docker     | Containerization   |
| Bootstrap  | UI styling         |

---

## 🔐 .env Configuration

Create a `.env` file in the `server/` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

---

## 🐳 Running with Docker

Make sure Docker is installed.

### Start All Services

```bash
docker-compose up --build
```

### Access App

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:5000](http://localhost:5000)

---

## 🧑‍💻 Usage Guide

### 1. Authentication

* Register and Login to access protected routes.

### 2. Create Task

* Fill in task title, description, start and end date.
* Upload 1–3 PDF files.

### 3. View Tasks

* See all tasks.
* Mark tasks as **complete** or **important**.
* Download attached PDFs.
* Use filters and pagination to manage tasks.

### 4. Edit & Delete Tasks

* Modify task details or delete them entirely.

---

## 📂 Uploads

All uploaded PDF files are:

* Stored in `/server/uploads/`
* Linked to tasks in MongoDB
* Available for download in the **View Task** screen

---

## 🦚 Sample Credentials

| Email                                   | Password |
| --------------------------------------- | -------- |
| [test@gmail.com](mailto:test@gmail.com) | 12345678 |

---



 

 

 



 



