import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [messageInputs, setMessageInputs] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const teachersRef = ref(db, 'teachers');

        const unsubscribe = onValue(teachersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const teacherList = Object.entries(data).map(([id, teacher]) => ({
                    id,
                    ...teacher,
                }));
                setTeachers(teacherList);
            } else {
                setTeachers([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBookAppointment = (teacher) => {
        const db = getDatabase();
        const appointmentRef = push(ref(db, 'appointments'));
        const appointmentData = {
            teacherId: teacher.id,
            teacherName: teacher.name,
            date: new Date().toISOString(),
            status: 'pending',
        };

        set(appointmentRef, appointmentData)
            .then(() => {
                toast.success('Appointment booked successfully!');
            })
            .catch((error) => {
                console.error('Error booking appointment:', error);
                toast.error('Failed to book appointment.');
            });
    };

    const handleSendMessage = (teacher) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            toast.error('You must be logged in to send messages.');
            return;
        }

        const db = getDatabase();
        const message = messageInputs[teacher.id]?.trim();
        if (!message) {
            toast.error('Please enter a message before sending.');
            return;
        }

        const messageRef = push(ref(db, 'messages'));
        const messageData = {
            teacherId: teacher.id,
            teacherName: teacher.name,
            receiverEmail: teacher.email, // recipient
            senderEmail: user.email, // sender
            message,
            timestamp: new Date().toISOString(),
        };

        set(messageRef, messageData)
            .then(() => {
                toast.success('Message sent successfully!');
                setMessageInputs((prev) => ({ ...prev, [teacher.id]: '' }));
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                toast.error('Failed to send message.');
            });
    };

    const handleMessageChange = (teacherId, value) => {
        setMessageInputs((prev) => ({ ...prev, [teacherId]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Search Teachers</h1>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by name, department, or subject"
                        value={searchTerm}    
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>   
   
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredTeachers.map((teacher) => (
                        <div key={teacher.id} className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-2">{teacher.name}</h2>
                            <p className="text-gray-600">Department: {teacher.department}</p>
                            <p className="text-gray-600">Subject: {teacher.subject}</p>
                            <p className="text-gray-600 mb-4">Email: {teacher.email}</p>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={messageInputs[teacher.id] || ''}
                                    onChange={(e) => handleMessageChange(teacher.id, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
   
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleBookAppointment(teacher)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
                                >
                                    Book Appointment
                                </button>
                                <button
                                    onClick={() => handleSendMessage(teacher)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchTeacher;
