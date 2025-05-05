import React from 'react'

const StudentApproval = () => {
    
    return (
        <div>
            <div className="max-w-2xl mx-auto mt-12">
                <h2 className="text-2xl font-semibold mb-4">Pending Student Approvals</h2>

                <ul className="space-y-4">
                    <li className="bg-white shadow p-4 rounded flex justify-between items-center">
                        <div>
                            <p className="font-bold">Ali Hossain</p>
                            <p className="text-sm text-gray-600">ali@student.edu</p>
                        </div>
                        <div className="space-x-2">
                            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Approve</button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default StudentApproval