const Home = () => {
    return (
        <>
            <form className="input-form">
                <div className="form-element" style={{marginLeft: "340px"}}>
                    <label>User Name: </label> 
                    <input type="text" name="name" style={{outline:"none"}}/>
                </div>
                <br></br>
                <div class="form-ele">
                <div className="form-element">
                    <label> Workout Type: </label>
                    <select>
                        <option value="Cycling">Cycling</option>
                        <option value="Running">Running</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Swimming">Swimming</option>
                    </select>
                </div>
                <br></br>
                <div className="form-element">
                    <label> Workout Minutes: </label>
                        <input type="number"/>
                </div>
                </div>
                <br></br>
                <button className="btn" type="submit" style={{ marginLeft: "340px"}}> Add Workout </button>
            </form>
            
        </>
    )
}

export default Home;