import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MessageInbox = () => {
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);

                // Fetch messages here:
                const db = getDatabase();
                const messagesRef = ref(db, 'messages');

                const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const messagesList = Object.entries(data)
                            .map(([id, message]) => ({
                                id,
                                ...message,
                            }))
                            .filter((msg) => msg.receiverEmail === user.email)
                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                        setMessages(messagesList);
                    } else {
                        setMessages([]);
                    }
                });

                // Cleanup on unmount:
                return () => unsubscribeMessages();
            } else {
                toast.error('User not logged in.');
            }
        });

        return () => unsubscribeAuth();
    }, []);

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
                <h2 className="text-3xl font-semibold mb-6 text-center">Message Inbox</h2>

                {messages.length === 0 ? (
                    <p className="text-center text-gray-600">No messages received.</p>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className="bg-white shadow rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-800 font-semibold">
                                        From: {msg.senderEmail}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(msg.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-gray-700">{msg.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageInbox;
