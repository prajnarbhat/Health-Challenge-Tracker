import { useContext, useEffect, useState } from "react";
import { DataContext } from "./DataContext";

const TableData = () => {
    const { data } = useContext(DataContext);
    const [page, setPage] = useState(1);
    const [searchText, setSearchtext] = useState("");
    const [workoutValue, setWorkoutvalue] = useState("");
    const [userData, setData] = useState([]);

    const itemsPerPage = 5;
    const workoutData = ["Cycling", "Running", "Yoga", "Swimming"];

    const setPageHandler = (selectedPage) => {
        if (
            selectedPage >= 1 &&
            selectedPage <= Math.ceil(userData.length / itemsPerPage) &&
            selectedPage !== page
        ) {
            setPage(selectedPage);
        }
    };

    // Filter by userName
    const applyNameFilter = (users) => {
        if (!searchText) return [];
        return users.filter(user =>
            user.userName.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    // Filter by workoutType
    const applyWorkoutFilter = (users) => {
        if (!workoutValue) return [];
        return users.filter(user =>
            user.workouts.some(workout =>
                workout.workoutType.toLowerCase().includes(workoutValue.toLowerCase())
            )
        );
    };

    useEffect(() => {
        let result = [...data];

        const filteredByName = applyNameFilter(result);
        const filteredByWorkout = applyWorkoutFilter(result);

        // Combine both filters using OR logic and remove duplicates
        const filteredData = [...new Set([...filteredByName, ...filteredByWorkout])];

        // If no filters applied, show all
        setData((searchText || workoutValue) ? filteredData : result);
        setPage(1); // Reset to first page when filters change
    }, [searchText, workoutValue, data]);

    const paginatedData = userData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <>
            <h2>Workout Summary</h2>

            <div>
                <input
                    type="search"
                    placeholder="Search by name"
                    value={searchText}
                    onChange={(e) => setSearchtext(e.target.value)}
                />
            </div>

            <div>
                <select
                    value={workoutValue}
                    onChange={(e) => setWorkoutvalue(e.target.value)}
                >
                    <option value="">Select a workout Type</option>
                    {workoutData.map((wdata, index) => (
                        <option key={index} value={wdata}>
                            {wdata}
                        </option>
                    ))}
                </select>
            </div>

            <table border="1">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Workout Type</th>
                        <th>Number of Workouts</th>
                        <th>Total Workout Min</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.userName}</td>
                                <td>{user.workouts.map(w => w.workoutType).join(", ")}</td>
                                <td>{user.workouts.length}</td>
                                <td>{user.workouts.reduce((acc, w) => acc + w.workoutMin, 0)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No matching data</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {userData.length > itemsPerPage && (
                <div className="pagination">
                    <span
                        className={page > 1 ? "" : "pagination_disabled"}
                        onClick={() => setPageHandler(page - 1)}
                    >
                        <button className="previous">&laquo; Previous</button>
                    </span>

                    {[...Array(Math.ceil(userData.length / itemsPerPage))].map(
                        (_, index) => (
                            <span
                                key={index}
                                className={page === index + 1 ? "pagination-selected" : ""}
                                onClick={() => setPageHandler(index + 1)}
                            >
                                {index + 1}
                            </span>
                        )
                    )}

                    <span
                        className={
                            page < Math.ceil(userData.length / itemsPerPage)
                                ? ""
                                : "pagination_disabled"
                        }
                        onClick={() => setPageHandler(page + 1)}
                    >
                        <button className="next">Next &raquo;</button>
                    </span>
                </div>
            )}
        </>
    );
};

export default TableData;
