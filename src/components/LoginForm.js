import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";

const LoginForm = () => {

    // Pass all the form details to an object and store it in localStorage
    const [userName, setName] = useState("")
    const [workoutType, setWorkoutType] = useState("")
    const [workoutMin, setWorkoutMin] = useState("")

    const navigate = useNavigate();

    // https://usehooks.com/uselocalstorage
    const { data, setData} = useContext(DataContext)

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const newWorkout = {
            workoutType,
            workoutMin,
        };
    
        const updatedData = [...data].reduce((acc,item) => {
            // First adding the newWorkout to workouts
            // workout that needs to be added is a m array
            // [{...item.workout,newWorkout}]
            // adding newWorkout object to the array which is present inside workouts
            // now need to push this to individual object item
            // {...item, workouts: [...item.workout, newWorkout]}
            // now pass this to array acc
            // [...acc, {...item, workouts: [...item.workout, newWorkout]}]
            // this perform only if the userName is already present in array
            if (item.userName == userName) {
                return [...acc, {...item, workouts: [...item.workouts, newWorkout]}];
            }
            return [...acc,item]
        },[])

        if(!data.some(item => item.userName == userName)) {
            // if the user is not present in array then create a new user with userName and new array workout
            updatedData.push({userName: userName,workouts:[newWorkout]})
        }

        console.log("Updated data:", updatedData);
        setData(updatedData);
    
        setName("");
        setWorkoutType("");
        setWorkoutMin("");

        navigate("/TableData");
    };
    


    return (
        <>
            <form className="input-form" onSubmit={handleSubmit}>
                <div className="form-element" style={{marginLeft: "340px"}}>
                    <label>User Name: </label> 
                    <input type="text" name="name" value={userName} onChange={(e) => setName(e.target.value.trim())} required/>
                </div>
                <br></br>
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
                <br></br>
                <div className="form-element">
                    <label> Workout Minutes: </label>
                        <input type="number" name="min" value={workoutMin} onChange={(e) => setWorkoutMin(e.target.value.trim())} required/>
                </div>
                </div>
                <br></br>
                <button className="btn" type="submit" style={{ marginLeft: "340px"}} >Click me!</button>
            </form>
            {/* <div className="table-data">
                <TableData data={data}/>
            </div> */}
        </>
    )
}

export default LoginForm;

