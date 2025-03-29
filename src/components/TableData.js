const TableData = ({ data }) => {
    console.log("Array of data:", data);

    // Function to merge workout minutes if the same type exists
    const mergeWorkoutMinutes = (workouts) => {
        return workouts.reduce((acc, workout) => {
            const existingWorkout = acc.find(w => w.workoutType === workout.workoutType);

            if (existingWorkout) {
                // Ensure workoutMin is treated as a number to prevent string concatenation
                existingWorkout.workoutMin += Number(workout.workoutMin);
            } else {
                // Convert workoutMin to a number before adding it
                acc.push({ ...workout, workoutMin: Number(workout.workoutMin) });
            }

            return acc;
        }, []);
    };

    const tableRows = data.length > 0 ? (
        data.map((user, index) => {
            const mergedWorkouts = mergeWorkoutMinutes(user.workouts);

            return (
                <tr key={index}>
                    <td>{user.userName}</td>
                    <td>{mergedWorkouts.map(workout => workout.workoutType).join(", ")}</td>
                    <td>{mergedWorkouts.length}</td>
                    <td>{mergedWorkouts.reduce((total, workout) => total + Number(workout.workoutMin), 0)}</td> 
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>No data available</td>
        </tr>
    );

    return (
        <>
            <h2>Workout Data</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Workout Type</th>
                        <th>Number of Workouts</th>
                        <th>Total Workout Minutes</th>
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
        </>
    );
};

export default TableData;
