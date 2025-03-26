const TableData = (props) => {
    console.log("Array of data:", props.data);

    const arrayOfUserData = props.data;

    const tableRows = (
        arrayOfUserData.length > 0 && (
            arrayOfUserData.map((info) => (
                <tr key={info.id}>
                    <td> {info.userName} </td>
                    <td> {info.workoutType} </td>
                    <td> {info.workoutMin} </td>
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