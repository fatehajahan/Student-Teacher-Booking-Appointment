import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userLoginInfo } from '../../Slices/userSlices';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
    const auth = getAuth();
    const db = getDatabase();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const approvedRef = ref(db, 'approvedStudents');

                onValue(
                    approvedRef,
                    (snapshot) => {
                        let approved = false;
                        snapshot.forEach((childSnapshot) => {
                            const data = childSnapshot.val();
                            if (data.email === user.email) {
                                approved = true;
                            }
                        });

                        if (approved) {
                            dispatch(userLoginInfo(user));
                            localStorage.setItem("userLoginInfo", JSON.stringify(user));
                            toast.success("Login Successful!");
                            setTimeout(() => {
                                navigate('/searchTeacher');
                            }, 2000);
                        } else {
                            toast.error('You are not an approved Student, Please wait for Admin Approval');
                        }
                    },
                    {
                        onlyOnce: true,
                    }
                );
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode.includes("auth/invalid-credential")) {
                    setError('Please give your Registered email ID and Password...!!');
                } else {
                    setError('Something went wrong. Please try again.');
                }
            });

        setError('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer
                position="top-center"
                autoClose={5000}
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

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Student Login</h2>
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-[5px] text-left">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-[5px] text-left">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
