import React, { useState } from 'react';
import { getDatabase, push, ref, set } from 'firebase/database';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScheduleAppointment = () => {
    const [studentEmail, setStudentEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!studentEmail || !date || !time) {
            toast.error('Please fill in all fields.');
            return;
        }

        const db = getDatabase();
        const appointmentRef = push(ref(db, 'appointments'));

        set(appointmentRef, {
            studentEmail,
            date,
            time,
            status: 'pending',
            createdAt: new Date().toISOString(),
        })
            .then(() => {
                toast.success('Appointment scheduled successfully!');
                setStudentEmail('');
                setDate('');
                setTime('');
            })
            .catch((error) => {
                console.error('Error scheduling appointment:', error);
                toast.error('Failed to schedule appointment.');
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <ToastContainer position="top-center" autoClose={2000} transition={Bounce} />
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Schedule Appointment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Student Email:</label>
                        <input
                            type="email"
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            placeholder="Enter student email"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Time:</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full cursor-pointer"
                    >
                        Schedule
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ScheduleAppointment;
