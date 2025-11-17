import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext()

export const DataProvider = ({children})=>{
    const[data,setData] = useState(null)
    //fetching data 

    const fetchAllProducts = async()=>{
        try {
        const response = await axios.get('https://dummyjson.com/products?limit=194')
        const Products = response.data.products
        setData(Products)
        } catch (error) {
            console.log(error)
        }
    }

    const getUniqueCategory = (data,property)=>{
       let newval = data?.map((curElem)=>{
        return curElem[property]
       })
       return newval = ["All",...new Set(newval)]
    }

    const categoryOnlyData = getUniqueCategory(data,"category")
    const brandOnlyData = getUniqueCategory(data,"brand")
    //console.log(categoryOnlyData)
    //console.log("b:",brandOnlyData)
    
    

    return <DataContext.Provider value={{data,setData,fetchAllProducts,categoryOnlyData,brandOnlyData}}>
        {children}
    </DataContext.Provider>
}

export const getData = ()=>useContext(DataContext)