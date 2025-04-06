import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { useContext } from "react";
  
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

    const arrayOfWtype = data.flatMap(workout => 
        workout.workouts.map(wtype => wtype.workoutType)
    )
    console.log(arrayOfWtype)

    const arrayOfWMin = data.flatMap(workout => 
        workout.workouts.map(wmin => wmin.workoutMin)
    )

    console.log(arrayOfWMin)

    return (
        <>
        <div className="mainCard">
            Card1
            <div class="content-card">
                <Bar 
                    data = {{
                        labels : arrayOfWtype,
                        datasets : [
                            {
                                label: "User Progress",
                                data: arrayOfWMin
                            }
                        ]
                    }}
                />
            </div>
        </div>
        </>
        
    )

}

export default Chart;