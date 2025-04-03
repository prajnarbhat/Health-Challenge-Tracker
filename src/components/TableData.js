import { useContext, useState } from "react";
import { DataContext } from "./DataContext";

const TableData = () => {
    const { data } = useContext(DataContext);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    
    const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const setPageHandler = (selectedPage) => {
        if( selectedPage >= 1 && selectedPage <= Math.ceil(data.length/itemsPerPage) && selectedPage !== page )
        setPage(selectedPage)
    }
    return (
        <>
            <h2>Workout Summary</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th> User Name </th>
                        <th> Workout Type </th>
                        <th> Number of Workouts </th>
                        <th> Total Workout Min </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.userName}</td>
                            <td>{user.workouts.map(w => w.workoutType).join(", ")}</td>
                            <td>{user.workouts.length}</td>
                            <td>{user.workouts.reduce((acc, w) => acc + w.workoutMin, 0)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {data.length > 0 && (<div className="pagination">

                <span className={page > 1 ? "" : "pagination_disabled"}  onClick={() => setPageHandler(page-1)}><button className="previous">
                        &laquo; Previous
                    </button></span>
                {[...Array(Math.ceil(data.length/itemsPerPage))].map((_dirname,index) => (
                    <span className={page == index+1 ? "pagination-selected" : ""} onClick={() => setPageHandler(index+1)} > {index+1} </span>
                    ))}

                <span  className={page < Math.ceil(data.length / itemsPerPage) ? "" : "pagination_disabled"} onClick={() => setPageHandler(page+1)}><button className="next"> Next &raquo;</button></span>
                
                </div>)} 

            
        </>
    );
};

export default TableData;
