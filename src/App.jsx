import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import firebaseConfig from './authentication/firebase.config'
import TeacherForm from './Pages/Admin/TeacherForm'
import AdminMainPage from './Pages/MainPage/MainPage'
import TeacherList from './Pages/Admin/TeacherList';
import StudentApproval from './Pages/Admin/StudentApproval';
import Register from './Pages/Student/Register';

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
    path: "/studentApprovalList",
    element: <StudentApproval />
  },

  // for students
  {
    path: "/studentRegister",
    element: <Register />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
