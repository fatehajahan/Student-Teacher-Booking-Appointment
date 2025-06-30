import { getDatabase, onValue, ref, remove, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherList = () => {
    const [getTeachers, setGetTeachers] = useState([]);
    const [editTeacherName, setEditTeacherName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const db = getDatabase();

    // Fetch teacher list
    useEffect(() => {
        const teachersRef = ref(db, 'teachers/');
        onValue(teachersRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setGetTeachers(arr);
        });
    }, []);

    // Handle edit button click
    const handleEditTeacher = (teacher) => {
        setEditTeacherName(teacher.name);
        setEditingId(teacher.id);
    };

    // Save updated teacher name
    const updateTeacher = (item) => {
        if (!editTeacherName.trim()) return;

        const teacherRef = ref(db, `teachers/${item.id}`);
        update(teacherRef, { name: editTeacherName })
            .then(() => {
                toast.success("Teacher updated successfully!");
                setEditingId(null);
                setEditTeacherName('');
            })
            .catch((err) => {
                toast.error("Update failed!");
                console.error(err);
            });
    };

    // delete teacher
    const handleDeleteTeacher = (item) => {
        const teacherRef = ref(db, `teachers/${item}`)
        remove(teacherRef)
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
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

            <div className="max-w-2xl mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-4">Teacher List</h2>

                <ul className="space-y-4">
                    {getTeachers.map((teacher) => (
                        <li
                            key={teacher.id}
                            className="bg-gray-100 p-4 rounded flex flex-col gap-2"
                        >
                            {editingId === teacher.id ? (
                                <div className="flex gap-2 w-full">
                                    <input
                                        value={editTeacherName}
                                        onChange={(e) => setEditTeacherName(e.target.value)}
                                        className="flex-1 border border-gray-300 px-2 py-1 rounded"
                                    />
                                    <button
                                        onClick={updateTeacher}
                                        className="bg-green-500 text-white px-3 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div className='text-left'>
                                        <p className="font-bold text-lg">{teacher.name}</p>
                                        <p className="text-sm text-gray-600">Department: {teacher.department}</p>
                                        <p className="text-sm text-gray-600">Subject: {teacher.subject}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleEditTeacher(teacher)}
                                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteTeacher(teacher.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TeacherList;