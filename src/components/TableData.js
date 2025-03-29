const TableData = (props) => {
    console.log("Data fetched in table:",props.data)
    /* 1: userName: "Prajna R Bhat"workouts: Array(7)0: 
{workoutType: 'Running', workoutMin: '23222'}1: {workoutType: 'Yoga', workoutMin: '452'}2: {workoutType: 'Yoga', workoutMin: '452'}
*/
    const arrayOfUserData = props.data;

    const mergeWorkoutMin = (workoutdata) =>{
        //console.log("data here:", workoutdata);
        // we will get the workouts array which contains the object with properties as wtype and wmin
        // we will merge the wmin values of duplicate wtype

        // create a new array and verify use reduce
        return ( workoutdata.reduce((acc,workout) => {
            // acc is an empty array
            // First check if the wtype object like running or other already existed
            const existingwtype = acc.find(w => w.workoutType === workout.workoutType);

            // If the wtype already present in the array then add the wmin to the previous wtype
            if(existingwtype){
                // here we are adding the wmin to the existing wtype
                // existing wtype is an object where we are accessing the wmin and adding new wmin to it
                existingwtype.workoutMin += Number(workout.workoutMin);
            }

            // else add the wtype and wmin to the array
            else {
                acc.push({...workout, workoutMin: Number(workout.workoutMin)})
            }
            return acc;
        },[])
    )}

    const tableRows =  arrayOfUserData.map(userinfo => {

        const duplicateWorkoutType = mergeWorkoutMin(userinfo.workouts)

        console.log(duplicateWorkoutType)
        return (
            <tr>
                <td>{userinfo.userName}</td>
                <td>{duplicateWorkoutType.map(workout => (
                    workout.workoutType
                )).join(",") }</td>
                <td> {duplicateWorkoutType.map(workout => (
                    workout.workoutType
                )).length}</td>
                <td> {duplicateWorkoutType.reduce((acc,workout) => acc + parseInt(workout.workoutMin), 0)}</td>

            </tr>
    )})

    return (
    <>
        <table border="1">
            <thead>
                <tr>
                <th> <strong> UserName </strong></th>
                <th> <strong> Workout Type </strong></th>
                <th> <strong> Number of workout </strong></th>
                <th> <strong> Workout Min </strong></th>
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