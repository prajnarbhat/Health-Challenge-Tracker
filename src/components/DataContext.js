// import createContext
import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext } from "react";

// 1. create an object crateContext returns an components pass it to a variable

export const DataContext = createContext();

// 2. Create a dtacontext provider to get values

// use UseState get the array of data from ls or empty data we need this data for form and also get the data in table


export const DataProvider = ({children}) => {

    const [ data, setData] = useLocalStorage("userInfo", []);
    
    return (
        <DataContext.Provider value={{data,setData}}>
            {children}
        </DataContext.Provider>
    )
}