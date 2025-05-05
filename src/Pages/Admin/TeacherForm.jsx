import React, { useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { getDatabase, push, ref, set } from 'firebase/database';

const TeacherForm = () => {
    const db = getDatabase()
    const [teacherName, setTeacherName] = useState('');
    const [department, setDepartment] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!teacherName || !department || !subject) {
            alert('Please fill in all fields.');
            return;
        }

        const newTeacher = {
            name: teacherName,
            department,
            subject,
        };

        console.log('New Teacher:', newTeacher);

        if (teacherName, department, subject) {
            set(push(ref(db, 'teachers/')), {
                name: teacherName,
                department: department,
                subject: subject
            })
                .then(() => {
                    toast.success("Teacher added successfully");
                })
        }
        // Reset form
        setTeacherName('');
        setDepartment('');
        setSubject('');
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
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
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Add Teacher
                </button>
            </form>
        </div>
    );
};

export default TeacherForm;
