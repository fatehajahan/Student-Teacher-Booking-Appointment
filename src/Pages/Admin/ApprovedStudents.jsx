import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const ApprovedStudents = () => {
    const [approvedStudents, setApprovedStudents] = useState([]);
    const db = getDatabase();

    useEffect(() => {
        const approvedRef = ref(db, 'approvedStudents/');
        const unsubscribe = onValue(approvedRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), userid: item.key });
            });
            setApprovedStudents(arr);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, [db]);

    const handleRemove = (userid) => {
        remove(ref(db, `approvedStudents/${userid}`))
            .then(() => {
                toast.success('Student removed successfully.');
            })
            .catch((error) => {
                console.error('Error removing student:', error);
                toast.error('Failed to remove student.');
            });
    };

    return (
        <div className="max-w-2xl mx-auto mt-12">
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
            <h2 className="text-2xl font-semibold mb-4">Approved Students List</h2>
            <ul className="space-y-4">
                {approvedStudents.length > 0 ? (
                    approvedStudents.map((student) => (
                        <li
                            key={student.userid}
                            className="bg-white shadow p-4 rounded flex justify-between items-center"
                        >
                            <div>
                                <p className="font-bold">{student.name}</p>
                                <p className="text-sm text-gray-600">{student.email}</p>
                            </div>
                            <button
                                onClick={() => handleRemove(student.userid)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                            >
                                Remove
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No approved students found.</p>
                )}
            </ul>
        </div>
    );
};

export default ApprovedStudents;
