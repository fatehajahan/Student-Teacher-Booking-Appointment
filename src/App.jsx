import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import firebaseConfig from './authentication/firebase.config'
import TeacherForm from './Pages/Admin/TeacherForm'
import MainPage from './Pages/MainPage/MainPage'
import TeacherList from './Pages/Admin/TeacherList';
// import StudentApproval from './Pages/Admin/StudentApproval';
import Register from './Pages/Student/Register';
import Login from './Pages/Student/Login';
import WaitingStudent from './Pages/Admin/WaitingStudent';
import ApprovedStudents from './Pages/Admin/ApprovedStudents';
import TeacherLogin from './Pages/Teacher/TeacherLogin';
import TeacherDashboard from './Pages/Teacher/TeacherDashboard';
import SearchTeacher from './Pages/Student/SearchTeacher';
import ScheduleAppointment from './Pages/Teacher/ScheduleAppointment';
import ManageAppointments from './Pages/Teacher/ManageAppointments';
import MessageInbox from './Pages/Teacher/MessageInbox';
import Appointments from './Pages/Teacher/Appointments';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
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
  {
    path: "/scheduleAppointment",
    element: <ScheduleAppointment />
  },
  {
    path: "/manageAppointments",
    element: <ManageAppointments />
  },
  {
    path: "/messages",
    element: <MessageInbox />
  },
  {
    path: "/allAppointments",
    element: <Appointments />
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
  {
    path: "/searchTeacher",
    element: <SearchTeacher />
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
