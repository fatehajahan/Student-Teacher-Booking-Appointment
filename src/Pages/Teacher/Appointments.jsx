import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update, remove } from 'firebase/database';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const appointmentsRef = ref(db, 'appointments');

        const unsubscribe = onValue(appointmentsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const appointmentsList = Object.entries(data).map(([id, appointment]) => ({
                    id,
                    ...appointment,
                }));
                setAppointments(appointmentsList);
            } else {
                setAppointments([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleApprove = (appointmentId) => {
        const db = getDatabase();
        const appointmentRef = ref(db, `appointments/${appointmentId}`);
        update(appointmentRef, { status: 'approved' })
            .then(() => {
                toast.success('Appointment approved!');
            })
            .catch((error) => {
                console.error('Error approving appointment:', error);
                toast.error('Failed to approve appointment.');
            });
    };

    const handleCancel = (appointmentId) => {
        const db = getDatabase();
        const appointmentRef = ref(db, `appointments/${appointmentId}`);
        remove(appointmentRef)
            .then(() => {
                toast.success('Appointment canceled.');
            })
            .catch((error) => {
                console.error('Error canceling appointment:', error);
                toast.error('Failed to cancel appointment.');
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <ToastContainer
                position="top-center"
                autoClose={1500}
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
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">All Appointments</h2>

                {appointments.length === 0 ? (
                    <p className="text-center text-gray-600">No appointments found.</p>
                ) : (
                    <div className="space-y-4">
                        {appointments.map((appointment) => (
                            <div key={appointment.id} className="bg-white shadow rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">
                                            Teacher: {appointment.teacherName}
                                        </p>
                                        <p className="text-gray-600">Appointment ID: {appointment.id}</p>
                                        <p className="text-gray-600">
                                            Scheduled On:{' '}
                                            {new Date(appointment.date).toLocaleString()}
                                        </p>
                                        <p className="text-gray-600">
                                            Status:{' '}
                                            <span
                                                className={`font-semibold ${appointment.status === 'approved'
                                                    ? 'text-green-600'
                                                    : 'text-yellow-600'
                                                    }`}
                                            >
                                                {appointment.status}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        {appointment.status !== 'approved' && (
                                            <button
                                                onClick={() => handleApprove(appointment.id)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleCancel(appointment.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
