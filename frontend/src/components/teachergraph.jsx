import { Bar } from "react-chartjs-2";
import { Chart , CategoryScale , LinearScale , BarElement , Tooltip , Legend } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

Chart.register(CategoryScale , LinearScale , BarElement , Tooltip , Legend)

const Tgraph = () => {
    const [bardata , setbardata] = useState('')

    useEffect(() =>{
        const fetchdata = async() =>{
            const res = await axios.get('http://localhost:3001/api/teachers-count')
            const data = res.data;

            const labels = data.map((c) =>c.name)
            const teachercounts = data.map((c) =>c.teachercount)

            setbardata({
                labels,
                datasets:[{
                    label: 'Number of teacher',
                    data: teachercounts,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    borderWidth: 1,
                }]
            })
        }
        fetchdata()
    }, [])

    if(!bardata){
        return(
            <p>Bardata not found</p>
        )
    }

    return ( 
        <div >
            <Bar data={bardata} />
        </div>
     );
}
 
export default Tgraph;