import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import firebaseConfig from './authentication/firebase.config'
import TeacherForm from './Pages/Admin/TeacherForm'
import AdminMainPage from './Pages/MainPage/MainPage'
import TeacherList from './Pages/Admin/TeacherList';
// import StudentApproval from './Pages/Admin/StudentApproval';
import Register from './Pages/Student/Register';
import Login from './Pages/Student/Login';
import WaitingStudent from './Pages/Admin/WaitingStudent';
import ApprovedStudents from './Pages/Admin/ApprovedStudents';
import TeacherLogin from './Pages/Teacher/TeacherLogin';
import TeacherDashboard from './Pages/Teacher/TeacherDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminMainPage />,
  },
  {
    path: "/teacherForm",
    element: <TeacherForm />,
  },
  {
    path: "/teacherList",
    element: <TeacherList />
  },
  {
    path: "/waitingStudent",
    element: <WaitingStudent />
  },
  {
    path: "/approvedStudents",
    element: <ApprovedStudents />
  },

  // for teachers
  {
    path: "/teacherLogin",
    element: <TeacherLogin />
  },
  {
    path: "/teacherDashboard",
    element: <TeacherDashboard />
  },
  // for students
  {
    path: "/studentRegister",
    element: <Register />
  },
  {
    path: "/studentLogin",
    element: <Login />
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
