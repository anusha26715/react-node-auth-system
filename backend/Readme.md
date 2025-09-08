###Backend – React-Node Auth System

--🛠 Project Overview--

A secure authentication backend built with Node.js, Express, and SQLite. Handles user registration, login, session management, and logout with session-based authentication.

--🛠 Tech Stack--

    -Node.js
    -Express.js
    -SQLite3
    -bcrypt (password hashing)
    -express-session & cookie-parser (session handling)

--CORS--

---🎯 Key Features---

--Authentication Flow--

    1)Register new users with email + password
    2)Secure password hashing using bcrypt
    3)Login with session storage in cookies
    4)Logout clears session and cookie
    5)Protected dashboard route requiring authentication

--API Endpoints--

    1)POST /auth/register – Register user

    2)POST /auth/login – Authenticate user

    3)GET /auth/session – Check active session

    4)POST /auth/logout – Clear session and logout

    5)GET /auth/dashboard – Protected route, only accessible when logged in

--Database--

    1)SQLite file: users.db (auto-created)

    2)Table: users
        *id – primary key
        *email – unique
        *password – hashed password

--📱 Security Features--

    1)Passwords never stored as plain text
    2)HttpOnly session cookies
    3)Session destruction on logout
    4)Validation for required fields

--🚀 Setup and Installation--

**Navigate to backend folder**

    -cd backend


**Install dependencies**

    -npm install


**Start server**

    -node server.js


Default port: 5000

📋 Project Structure
backend/
├── routes/
│   └── auth.js
├── db.js
├── server.js
├── package.json
└── users.db (auto-created)

--🔍 Testing--

    -API tested with Postman

--Cookies/session verified--

    Register → Login → Dashboard → Logout flow confirmed

--🎯 Future Improvements--

    1)Add JWT authentication option
    2)Email validation on backend
    3)Rate limiting & brute force protection