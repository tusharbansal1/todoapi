import React, { useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


export default function Detail() {
    const {yourid}=useParams()

    const[data,setData]=useState({})
    
useEffect(()=>{
    fetch("http://localhost:8000/todos/"+yourid).then((res)=>{
        return res.json()
    }).then((resp)=>{
        // console.log("RESPONSE---------->",resp)
        setData(resp)
    }).catch((err)=>{
        console.log(err.message )
    })
},[])

  return (
    <div>
        <h1>details</h1>
        <div>
            {
                <div>
                        <h3>The userId is : <b>{data.userId}</b> </h3>
                        <h3>id is : {data.id}</h3>
                        <h3>Title is : {data.title}</h3>
                        <Link to="/">Back</Link>
                    </div>
            }
        </div>
    </div>
  )
}
