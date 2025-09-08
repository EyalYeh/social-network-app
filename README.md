# React + Express + PostgreSQL SignUp/Login App

This is a small web application built with **React** (frontend) and **Express** (backend) that allows users to **sign up**, store credentials in a **PostgreSQL database**, and eventually log in.

---

## Prerequisites

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (v12+)

---

## Project Structure

my-project/
├─ backend/
│ ├─ server.js
│ └─ package.json
├─ frontend/
│ ├─ src/
│ │ ├─ SignUp.js
│ │ └─ App.js
│ └─ package.json
└─ README.md

yaml
Copy code

- `backend/` — Express backend and Postgres connection
- `frontend/` — React app
- `README.md` — setup and instructions

---

## 1. Clone the repository

git clone <your-repo-url>
cd <your-project-folder>
2. Setup Backend
Navigate to the backend folder:

```bash
Copy code
cd backend
Install dependencies:
```

```bash
Copy code
npm install express cors body-parser bcrypt pg 
Configure Postgres connection in server.js:
```

```js
Copy code
const pool = new Pool({
  user: "postgres",         // your postgres user
  host: "localhost",
  database: "myapp",        // make sure this database exists
  password: "<your_password>",
  port: 5432,
});
Create the database and users table:
```
```bash
Copy code
psql -U postgres -W
Then in the psql shell:
```
```sql

CREATE DATABASE myapp;

\c myapp

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL
);
Start the backend:
```

bash
Copy code
node server.js
The backend runs on http://localhost:5000.

3. Setup Frontend
Navigate to the frontend folder:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
npm install @mui/material @emotion/react @emotion/styled axios
Start the frontend:

bash
Copy code
npm start
The frontend runs on http://localhost:3000.

4. Using the App
Open your browser at http://localhost:3000.

Fill in the Sign Up form with email, username, and password.

Click Sign Up → the data will be sent to your backend and stored in Postgres.

Check your database:

sql
Copy code
SELECT * FROM users;
Passwords are hashed using bcrypt.

5. Notes
Make sure PostgreSQL is running before starting the backend.

CORS is enabled in the backend (app.use(cors())) so the frontend can communicate with it.

You can later add a login route to authenticate users and show “Welcome, username!”.

6. Optional: Debugging
Open the backend terminal — you will see logs of incoming requests.

Open your browser console → Network tab to ensure requests are being sent to http://localhost:5000/signup.

If signup fails, check that the backend is running and the database connection is correct.
