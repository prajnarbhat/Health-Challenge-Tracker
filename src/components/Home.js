
const Home = (props) => {
    // const location = useLocation();
    // const receivedData = location.state?.data || [];
    console.log(props.location.state.example);
    
   // const [data, setData] = useState(receivedData)

   // console.log("Recived data here:", data);

    // useEffect(() => {
    //     if (receivedData.length > 0) {
    //         setData(receivedData);
    //     }
    // }, [receivedData]);

    // return (
    //     <>
    //         <div className="table-data">
    //             <TableData data={data} />
    //         </div> 
    //     </>
    // );
};

export default Home;
