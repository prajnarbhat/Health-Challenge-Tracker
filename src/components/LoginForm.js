import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";

const LoginForm = () => {
    const [userName, setName] = useState("");
    const [workoutType, setWorkoutType] = useState("");
    const [workoutMin, setWorkoutMin] = useState("");

    const navigate = useNavigate();
    const { data, setData } = useContext(DataContext);

    const mergeWorkoutMin = (workouts) => {
        return workouts.reduce((acc, workout) => {
            const existingWorkout = acc.find(w => w.workoutType === workout.workoutType);
            if (existingWorkout) {
                existingWorkout.workoutMin += Number(workout.workoutMin);
            } else {
                acc.push({ ...workout, workoutMin: Number(workout.workoutMin) });
            }
            return acc;
        }, []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newWorkout = { workoutType, workoutMin: Number(workoutMin) };

        let updatedData = data.map(user => {
            if (user.userName === userName) {
                // Merge new workout with existing workouts
                const updatedWorkouts = mergeWorkoutMin([...user.workouts, newWorkout]);
                return { ...user, workouts: updatedWorkouts };
            }
            return user;
        });

        // If user doesn't exist, add new user
        if (!data.some(user => user.userName === userName)) {
            updatedData.push({ userName, workouts: [newWorkout] });
        }

        console.log("Updated Data:", updatedData);
        setData(updatedData);

        // Reset input fields
        setName("");
        setWorkoutType("");
        setWorkoutMin("");

        // Navigate to TableData page
        navigate("/TableData");
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
           <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 class="text-xl font-medium text-gray-900 dark:text-white"> Add User</h5>
                <div className="form-element">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name </label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" name="name" value={userName} onChange={(e) => setName(e.target.value.trim())} required />
                </div>

                <div className="form-element">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Workout Type </label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={workoutType} onChange={(e) => setWorkoutType(e.target.value.trim())} required>
                            <option value="">Select Workout</option>
                            <option value="Cycling">Cycling</option>
                            <option value="Running">Running</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Swimming">Swimming</option>
                        </select>
                    </div>
                   
                <div className="form-element">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Workout Minutes </label>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" type="number" name="min" value={workoutMin} onChange={(e) => setWorkoutMin(e.target.value)} required />
                    </div>
               
                <button className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit"> Submit </button>
            </form>
            <div className="mt-4 text-center">
            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                Want to see all workouts?
            </span>
            <Link to="/TableData" className="text-blue-600 hover:underline dark:text-blue-400">
                View Table
            </Link>
            </div>
            </div>
            
            </div>
        </>
    );
};

export default LoginForm;
