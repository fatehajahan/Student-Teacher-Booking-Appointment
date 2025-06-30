import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const appointmentsRef = ref(db, 'appointments');

        const unsubscribe = onValue(appointmentsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const appointmentList = Object.entries(data).map(([id, appointment]) => ({
                    id,
                    ...appointment,
                }));
                setAppointments(appointmentList);
            } else {
                setAppointments([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleUpdateStatus = (id, newStatus) => {
        const db = getDatabase();
        const appointmentRef = ref(db, `appointments/${id}`);

        update(appointmentRef, { status: newStatus })
            .then(() => {
                toast.success(`Appointment ${newStatus}!`);
            })
            .catch((error) => {
                console.error('Error updating status:', error);
                toast.error('Failed to update appointment.');
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
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center">Manage Appointments</h2>

                {appointments.length === 0 ? (
                    <p className="text-center text-gray-600">No appointments available.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {appointments.map((appt) => (
                            <div key={appt.id} className="bg-white shadow rounded-lg p-4">
                                <h3 className="text-xl font-semibold">{appt.studentEmail}</h3>
                                <p className="text-gray-600">Date: {appt.date}</p>
                                <p className="text-gray-600">Time: {appt.time}</p>
                                <p className="text-gray-600">Status: {appt.status}</p>
                                <div className="mt-4 flex gap-2">
                                    {appt.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleUpdateStatus(appt.id, 'approved')}
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(appt.id, 'cancelled')}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAppointments;
