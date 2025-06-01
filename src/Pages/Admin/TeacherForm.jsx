import React, { useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { getDatabase, push, ref, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const TeacherForm = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [teacherName, setTeacherName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!teacherName || !email || !department || !subject) {
            alert('Please fill in all fields.');
            return;
        }

        const sharedPassword = "teacher123"; // 🔑 Shared password for all teachers

        try {
            // 1️⃣ Create user in Firebase Authentication
            await createUserWithEmailAndPassword(auth, email, sharedPassword);

            // 2️⃣ Save teacher data to Realtime Database
            const newTeacherRef = push(ref(db, 'teachers/'));
            await set(newTeacherRef, {
                name: teacherName,
                email,
                department,
                subject
            });

            toast.success("Teacher added successfully");
            // 3️⃣ Reset form
            setTeacherName('');
            setEmail('');
            setDepartment('');
            setSubject('');
        } catch (error) {
            console.error("Error creating teacher:", error.message);
            toast.error("Failed to add teacher");
        }
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto"
            >
                <h2 className="text-2xl font-semibold mb-4">Add Teacher</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        placeholder="Enter Name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Department</label>
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="Enter Department"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter Subject"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full cursor-pointer"
                >
                    Add Teacher
                </button>
            </form>
        </div>
    );
};

export default TeacherForm;
