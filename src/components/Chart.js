import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { useContext, useEffect, useRef, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import { DataContext } from "./DataContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
    const { data } = useContext(DataContext);
    const [selectedUser, setUser] = useState(null);
    const [userListHeight, setUserListHeight] = useState(null);

    const userListRef = useRef(null);

    useEffect(() => {
        if (userListRef.current) {
            setUserListHeight(userListRef.current.offsetHeight);
        }
    }, [data, selectedUser]);

    const selectUserHandler = (user) => {
        setUser(user);
    };

    return (
        <div className="block m-5 p-6 bg-gray-200 border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            
            <div>
                <Link to="/TableData" className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> &#8249; Back to Table </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start justify-center bg-gray-100 dark:bg-gray-900 p-10 m-20">

                <div
                    ref={userListRef}
                    className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-xl p-4 w-full max-w-xs"
                >
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Select a User</h3>
                    <div className="space-y-2">
                        {data.map(user => (
                            <button
                                key={user.userName}
                                className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition"
                                onClick={() => selectUserHandler(user)}
                            >
                                {user.userName}
                            </button>
                        ))}
                    </div>
                </div>

             
                {selectedUser && (
                    <div
                        className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-xl p-6 w-full max-w-xl"
                        style={{ height: userListHeight ? `${userListHeight}px` : 'auto' }}
                    >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Workout Chart for {selectedUser.userName}
                        </h3>
                        <Bar
                            data={{
                                labels: selectedUser.workouts.map(w => w.workoutType),
                                datasets: [
                                    {
                                        label: "Workout Minutes",
                                        data: selectedUser.workouts.map(w => w.workoutMin),
                                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                                        borderRadius: 6,
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: true,
                                        labels: { color: '#374151' }
                                    },
                                    title: {
                                        display: true,
                                        text: 'Workout Progress',
                                        color: '#1f2937',
                                        font: { size: 18 }
                                    }
                                },
                                scales: {
                                    x: {
                                        ticks: { color: '#374151' },
                                        grid: { color: '#e5e7eb' }
                                    },
                                    y: {
                                        ticks: { color: '#374151' },
                                        grid: { color: '#e5e7eb' }
                                    }
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chart;
