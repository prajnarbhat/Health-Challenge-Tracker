const TableData = (props) => {
    console.log("Array of data:", props.data);

    //const [ arrayWorkoutType, setWtype] = useState([])

    const arrayOfUserData = props.data;

    const arrayOfWorkout = arrayOfUserData.flatMap(user => {
        return user.workouts;
    })
    console.log("Array of wtype:",arrayOfWorkout);
    const arrayWType = arrayOfWorkout.map(item => {
        return item.workoutType;
    })
   console.log("array of wtypes:", arrayWType.join(","));



    const tableRows = (
        arrayOfUserData.length > 0 && (
            arrayOfUserData.map((info, index) => (
                <tr key={info.index}>
                    <td> {info.userName} </td>
                    <td> {info.workouts.map(item => item.workoutType).join(", ")}</td>
                    <td> {info.workouts.map(item => { return  item.workout }).length} </td>
                    <td> {info.workouts.map(item => item.workoutMin).reduce((acc,item) => {
                        return acc + parseInt(item)
                    },0)}</td>
                </tr>
            ))
        ) 
    )

    return (
        <>
            <h3> Table data </h3>
            <table border="1">
                <thead>
                    <tr>
                        <th> UserName </th>
                        <th> WorkoutType </th>
                        <th> Number of Workout</th>
                        <th> WorkoutMinute </th>
                    </tr>
                </thead>
                <tbody>
                   {tableRows}
                </tbody>
            </table>
        </>

    )
}

export default TableData;