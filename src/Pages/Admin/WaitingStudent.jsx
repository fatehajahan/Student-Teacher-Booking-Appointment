import { getDatabase, onValue, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const WaitingStudent = () => {
    const [students, setStudents] = useState([]);
    const [approveStudent, setApproveStudent] = useState(null);
    const db = getDatabase();

    useEffect(() => {
        const userRef = ref(db, 'waitingStudents/');
        onValue(userRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), userid: item.key });
            });
            setStudents(arr);
        });
    }, [db]);

    const handleReject = (userid) => {
        remove(ref(db, `waitingStudents/${userid}`))
            .then(() => {
                toast.success("Student rejected and removed successfully");
            })
            .catch((error) => {
                console.error("Error removing student:", error);
                toast.error("Failed to remove student");
            });
    };

    const handleApprove = (userid) => {
        setApproveStudent(userid);
        // Find the student from the state by their userid
        const student = students.find(s => s.userid === userid);
        if (!student) {
            toast.error("Student data not found!");
            return;
        }

        const studentRef = ref(db, `waitingStudents/${userid}`);
        set(ref(db, `approvedStudents/${userid}`), {
            name: student.name,
            email: student.email,
        })
        .then(() => {
            remove(studentRef);
            toast.success("Student approved successfully");
            setApproveStudent(null); // Reset the approve button state
        })
        .catch((error) => {
            console.error("Error approving student:", error);
            toast.error("Failed to approve student");
            setApproveStudent(null);
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
            <h2 className="text-2xl font-semibold mb-4">Pending Student Approvals</h2>

            <ul className="space-y-4">
                {students.length > 0 ? (
                    students.map((student) => (
                        <li
                            key={student.userid}
                            className="bg-white shadow p-4 rounded flex justify-between items-center"
                        >
                            <div>
                                <p className="font-bold">{student.name}</p>
                                <p className="text-sm text-gray-600">{student.email}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleApprove(student.userid)}
                                    disabled={approveStudent === student.userid}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer">
                                    {approveStudent === student.userid ? "Approving..." : "Approve"}
                                </button>
                                <button
                                    onClick={() => handleReject(student.userid)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer">
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No students available for approval.</p>
                )}
            </ul>
        </div>
    );
};

export default WaitingStudent;
