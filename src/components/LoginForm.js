import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableData from "./TableData";

const LoginForm = () => {

    // Pass all the form details to an object and store it in localStorage
    const [userName, setName] = useState("")
    const [workoutType, setWorkoutType] = useState("")
    const [workoutMin, setWorkoutMin] = useState("")

    const navigate = useNavigate();

    // https://usehooks.com/uselocalstorage
    const [ data, setData] = useLocalStorage("userInfo", []);

    const handleSubmit = (e) =>{
        e.preventDefault();

        const newWorkout = {
            workoutType: workoutType,
            workoutMin: workoutMin,
        }

        // we get an object where we need to push everytime to the array

        // Check if the userName already existed in array using findIndex
        // findIndex returns the index of the first element in the array that satisfies the provided testing function

        const existingIndex = data.findIndex((item) => item.userName == userName);

        console.log("existingIndex:", existingIndex);
        // if it returns -1 then there is no data in the array where userName is equal to the input now

        let updatedData;
        if(existingIndex !== -1){
            // if it returns -1 then we push the new data to the array

            updatedData = [...data];
            console.log("Updated data here is:", updatedData);
            updatedData[existingIndex].workouts.push(newWorkout)
        }
        else {
            // if it returns a number then we update the existing data
            // craete a new array append that to existing array
            const newUser = {
                userName: userName,
                workouts: [newWorkout]
            };
            updatedData = [...data, newUser];
        }

        console.log("Updated data:", updatedData);
        setData(updatedData);

        setName("");
        setWorkoutType("");
        setWorkoutMin("");

    }


    return (
        <>
            <form className="input-form" onSubmit={handleSubmit}>
                <div className="form-element" style={{marginLeft: "340px"}}>
                    <label>User Name: </label> 
                    <input type="text" name="name" value={userName} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <br></br>
                <div className="form-ele">
                <div className="form-element">
                    <label> Workout Type: </label>
                    <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} required>
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
                        <input type="number" name="min" value={workoutMin} onChange={(e) => setWorkoutMin(e.target.value)} required/>
                </div>
                </div>
                <br></br>
                <button className="btn" type="submit" style={{ marginLeft: "340px"}} onClick={() =>navigate("/home")}>Click me!</button>
            </form>
            <div className="table-data">
                <TableData data={data}/>
            </div>
        </>
    )
}

export default LoginForm;