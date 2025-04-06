import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { useContext, useState } from "react";
  
import { Bar } from 'react-chartjs-2';
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
    console.log(data)


    const [ selectedUser, setUser] = useState(null)

    

    const selectUserHandler = (data) => {
        setUser(data)
        console.log(data)
    }

    // const arrayOfWtype = selectedUser.flatMap(workout => 
    //     workout.workouts.map(wtype => wtype.workoutType)
    // )
    // console.log(arrayOfWtype)

    // const arrayOfWMin = selectedUser.flatMap(workout => 
    //     workout.workouts.map(wmin => wmin.workoutMin)
    // )

    // console.log(arrayOfWMin)
    console.log("What is selectedUser:", selectedUser);


    return (
        <>
        <div  className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                {data.map(user => { 
                    return <button className="flex flex-col" onClick={() => selectUserHandler(user)}> {user.userName} </button>
                })} 
            </div>

            

            

            { selectedUser &&
            <div class="content-card" className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <Bar 
                    data = {{
                        labels : selectedUser.workouts.map(wtype => wtype.workoutType),
                        datasets : [
                            {
                                label: "User Progress",
                                data: selectedUser.workouts.map(wmin => wmin.workoutMin)
                            }
                            
                        ]
                        
                    }}
                />
            </div>
            }
        </div>
        </>
        
    )

}

export default Chart;