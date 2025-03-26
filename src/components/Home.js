import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import TableData from "./TableData";

const Home = () => {

    // Pass all the form details to an object and store it in localStorage
    const [userName, setName] = useState("")
    const [workoutType, setWorkoutType] = useState("")
    const [workoutMin, setWorkoutMin] = useState("")

    // https://usehooks.com/uselocalstorage
    const [ data, setData] = useLocalStorage("userInfo", []);

    const handleSubmit = (e) =>{
        e.preventDefault();

        const userData = {
            id: Date.now(), // Unique ID
            userName: userName,
            workoutType: workoutType,
            workoutMin: workoutMin
        }

        // We have an arrayOf object data and a new object is appended to the array creating a new array
        // Important: Using spread operator it creates a new array contains all previous entries plus append the data to the array
        const updatedUserData = [...data, userData];
        console.log("Updated user Data:", updatedUserData);
        setData(updatedUserData);

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
                <button className="btn" type="submit" style={{ marginLeft: "340px"}}> Add Workout </button>
            </form>
            <div>
                <TableData data={data}/>
            </div>
        </>
    )
}

export default Home;