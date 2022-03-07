import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

function  Trial() {
    const [data, setData] = useState([])
    const [dataq, setDataq] = useState([])

    useEffect(() => {
        getData();  
        const dat =[{id:1,Email:"kjjkjj"}]
        setDataq(dat)
      
    }, [])
    const getData = () =>{
        axios("https://jsonplaceholder.typicode.com/comments").then((res)=>
        {
            console.log(res.data);
            setData(res.data)
        }
        );
    }



    const columns = [
        {
            dataField:"Email",
            text:"Email",
        }
    ]
  return (
    <div>
        <BootstrapTable keyField = "id" data={dataq} column={columns}/>
    </div>
  )
}

export default Trial