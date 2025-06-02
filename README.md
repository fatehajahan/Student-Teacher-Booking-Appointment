# React + Vite

## 📚 Student-Teacher Booking Appointment Platform
This project is a React-based appointment booking system for students and teachers, built with Tailwind CSS, Firebase, and Redux for state management. It allows students to schedule appointments with teachers, teachers to manage appointments and messages, and admins to manage users.

## 🚀 Features
✅ Modern Tech Stack

React — Fast and component-based frontend.

Tailwind CSS — Utility-first styling.

Firebase — Authentication and backend data management.

Redux Toolkit — State management for authentication and global states.

React-Router-Dom — Client-side routing for smooth page transitions.

React-Toastify — User-friendly notifications instead of raw alert().

## 📂 Project Structure
src/
├── assets/
│   └── (images, e.g., banner)
├── authentication/
│   └── firebase.config.js
├── components/
│   └── Navbar/
│       └── Navbar.jsx
├── Pages/
│   ├── Admin/
│   │   ├── AdminHome.jsx
│   │   ├── ApprovedStudents.jsx
│   │   ├── TeacherForm.jsx
│   │   ├── TeacherList.jsx
│   │   └── WaitingStudent.jsx
│   ├── MainPage/
│   │   └── Home.jsx
│   ├── Student/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── SearchTeacher.jsx
│   └── Teacher/
│       ├── Appointments.jsx
│       ├── ManageAppointments.jsx
│       ├── MessageInbox.jsx
│       ├── ScheduleAppointment.jsx
│       ├── TeacherDashboard.jsx
│       └── TeacherLogin.jsx
├── Slices/
│   └── userSlices.js
├── App.jsx
├── index.js
└── (styles, configs, etc.)

## 🔑 Page Details
🏠 Home (Home.jsx)
A welcoming landing page with a banner image and buttons to navigate to Student Login or Student Register.

Contains a Navbar with a preconfigured admin login email/password for demo purposes.

## 🔑 Authentication
👨‍🏫 Teacher Login (TeacherLogin.jsx)
Allows teachers to log in using their credentials.

On successful login, teachers are redirected to the Teacher Dashboard.

🧑‍🎓 Student Login (Login.jsx)
Allows students to log in with their credentials.

📝 Student Register (Register.jsx)
Allows new students to register for the platform.

## 🖥️ Admin Pages
🏠 Admin Home (AdminHome.jsx)
Admin dashboard landing page.

➕ Teacher Form (TeacherForm.jsx)
Admin can add teachers with relevant information.

📋 Approved Students (ApprovedStudents.jsx)
Displays a list of students who have been approved.

⏳ Waiting Student (WaitingStudent.jsx)
Displays a list of students waiting for admin approval.

📖 Teacher List (TeacherList.jsx)
Admin can view the list of all registered teachers.

## 👨‍🏫 Teacher Dashboard (TeacherDashboard.jsx)
After login, teachers land on the Teacher Dashboard, where they can:

Schedule Appointments (ScheduleAppointment.jsx)

Approve/Cancel Appointments (ManageAppointments.jsx)

View Messages (MessageInbox.jsx)

View All Appointments (Appointments.jsx)

Logout — return to the login screen.

## 🧑‍🎓 Student Pages
🔍 Search Teacher (SearchTeacher.jsx)
Allows students to search and view available teachers.

📅 Appointments
Students can send appointment requests and messages to teachers after login.

## 🔄 Navigation
Implemented using react-router-dom for smooth client-side navigation.

## 🗃️ State Management
Implemented using Redux Toolkit in Slices/userSlices.js for:

Managing login state

Storing authenticated user data

## 🔔 Notifications
Implemented using react-toastify instead of raw alerts, providing a modern and non-intrusive user experience.

## 🛠️ Additional Notes
Admin login credentials are hardcoded in the Navbar component (for demonstration only — not secure for production!).

* Future improvements could include:

* Role-based routing protection.

* Real-time updates using Firebase Realtime Database.

* Better input validation and error handling.



Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
