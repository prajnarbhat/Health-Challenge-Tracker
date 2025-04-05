import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";

const LoginForm = () => {
    const [userName, setName] = useState("");
    const [workoutType, setWorkoutType] = useState("");
    const [workoutMin, setWorkoutMin] = useState("");

    const navigate = useNavigate();
    const { data, setData } = useContext(DataContext);

    // 🔹 Function to merge duplicate workout types
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
           <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="form-element" style={{ marginLeft: "340px" }}>
                    <label>User Name: </label>
                    <input type="text" name="name" value={userName} onChange={(e) => setName(e.target.value.trim())} required />
                </div>
                <br />
                <div className="form-ele">
                    <div className="form-element">
                        <label> Workout Type: </label>
                        <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value.trim())} required>
                            <option value="">Select Workout</option>
                            <option value="Cycling">Cycling</option>
                            <option value="Running">Running</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Swimming">Swimming</option>
                        </select>
                    </div>
                    <br />
                    <div className="form-element">
                        <label> Workout Minutes: </label>
                        <input type="number" name="min" value={workoutMin} onChange={(e) => setWorkoutMin(e.target.value)} required />
                    </div>
                </div>
                <br />
                <button className="btn" type="submit" style={{ marginLeft: "340px" }}>Click me!</button>
            </form>
            </div>
        </>
    );
};

export default LoginForm;
