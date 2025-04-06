import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            <div className="bg-gray-300 min-h-screen">
            <div className="flex justify-around pt-5">
                <button> <Link to="/TableData" className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">User table</Link></button>
                <button> <Link to="/chart" className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> User Progress  </Link></button>
            </div>
            <div className="block m-5 p-6 bg-gray-200 border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="m-3">
                <Link to="/" className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Add user </Link>
            
            </div>
            <div className="flex gap-x-8 m-2">
                <input className="bg-white text-black-1000 p-2"
                    type="search"
                    placeholder="Search by name"
                    value={searchText}
                    onChange={(e) => setSearchtext(e.target.value)}
                />
                <select className="bg-white text-black-1000"
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
            <div className="relative overflow-x-auto bg-gray-400 m-2">
            <table border="1" className="w-full text-sm text-left rtl:text-right bg-white">
                <thead className="uppercase dark:text-black-900">
                    <tr>
                        <th scope="col" class="px-6 py-3">User Name</th>
                        <th scope="col" class="px-6 py-3">Workout Type</th>
                        <th scope="col" class="px-6 py-3">Number of Workouts</th>
                        <th scope="col" class="px-6 py-3">Total Workout Min</th>
                    </tr>
                </thead>
                <tbody className="relative overflow-x-auto w-100 divide-y divide-gray-300">
                    {paginatedData.length > 0 ? (
                        paginatedData.map((user, index) => (
                            <tr key={index}>
                                <td class="px-6 py-4">{user.userName}</td>
                                <td class="px-6 py-4">{user.workouts.map(w => w.workoutType).join(", ")}</td>
                                <td class="px-6 py-4">{user.workouts.length}</td>
                                <td class="px-6 py-4">{user.workouts.reduce((acc, w) => acc + w.workoutMin, 0)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No matching data</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            

            {userData.length > itemsPerPage && (
                <div className="pagination bg-white m-2">
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
            </div>
            </div>
        </>
    );
};

export default TableData;
