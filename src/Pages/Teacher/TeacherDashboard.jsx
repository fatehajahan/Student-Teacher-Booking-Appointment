import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { CalendarDays, CheckCircle, MessageSquare, ClipboardList, LogOut } from 'lucide-react';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/teacher-login");
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Failed to logout");
      });
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Teacher Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Schedule Appointment */}
          <div
            onClick={() => handleNavigate('/teacher/schedule-appointment')}
            className="bg-white shadow hover:shadow-md transition rounded-lg p-6 flex items-center justify-between cursor-pointer"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">Schedule Appointment</h2>
              <p className="text-gray-600 text-sm">Set up new appointments with students.</p>
            </div>
            <CalendarDays className="w-10 h-10 text-blue-500" />
          </div>

          {/* Approve/Cancel Appointment */}
          <div
            onClick={() => handleNavigate('/teacher/approve-cancel')}
            className="bg-white shadow hover:shadow-md transition rounded-lg p-6 flex items-center justify-between cursor-pointer"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">Approve/Cancel Appointments</h2>
              <p className="text-gray-600 text-sm">Manage pending appointments.</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          {/* View Messages */}
          <div
            onClick={() => handleNavigate('/teacher/messages')}
            className="bg-white shadow hover:shadow-md transition rounded-lg p-6 flex items-center justify-between cursor-pointer"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">View Messages</h2>
              <p className="text-gray-600 text-sm">Check student messages.</p>
            </div>
            <MessageSquare className="w-10 h-10 text-purple-500" />
          </div>

          {/* View All Appointments */}
          <div
            onClick={() => handleNavigate('/teacher/all-appointments')}
            className="bg-white shadow hover:shadow-md transition rounded-lg p-6 flex items-center justify-between cursor-pointer"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">View All Appointments</h2>
              <p className="text-gray-600 text-sm">See your full appointment history.</p>
            </div>
            <ClipboardList className="w-10 h-10 text-orange-500" />
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded flex items-center justify-center mx-auto"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
