import "./UserInterface.scss"
import axios from "axios";
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const UserInterface = () => {
    // const [count, setCount] = useState(0);
    const [startDate,setStartDate]  = useState("");
    const [endDate,setEndDate]  = useState("");
    const [startCount, setStartCount] = useState(19);
    const [endCount, setEndCount] = useState(19);
    const [value, setValue]=useState("");
    const [cur, setCur] = useState("YYYY");
    const [loader, setLoader] = useState<Boolean>(false);

    const updateStartDate = (value:any) => {
        if (value.length <= 19) {
            setStartDate(value);
            setStartCount(19 - value.length);
        }
    };

    const updateEndDate = (value:any) => {
        if (value.length <= 19) {
        setEndDate(value);
        setEndCount(19 - value.length);
        }
    };

    const fetchData = async () => {
        if(cur === "Date Range"){
            const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
            if (!startDate.match(dateRegex)) {
                toast.warning("Please enter a valid Start Date in the format YYYY-MM-DD HH:MM:SS");
                return;
            }

            if (!endDate.match(dateRegex)) {
                toast.warning("Please enter a valid End Date in the format YYYY-MM-DD HH:MM:SS");
                return;
            }

        }

        else if(cur==="YYYY"){
            const dateRegex = /^\d{4}$/;
            if (!value.match(dateRegex)) {
                toast.warning("Please enter a valid Date in the format YYYY");
                return;
            }

        }

        else if(cur==="YYYY-MM"){
            const dateRegex = /^\d{4}-\d{2}$/;
            if (!value.match(dateRegex)) {
                toast.warning("Please enter a valid Date in the format YYYY-MM");
                return;
            }
        }

        else{
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!value.match(dateRegex)) {
                toast.warning("Please enter a valid Date in the format YYYY-MM-DD");
                return;
            }

        }
    
        const date = startDate+","+endDate;
        console.log(date)
        try{
            setLoader(true);
        const response = await axios.get(`http://127.0.0.1:5000/1/queries/count/${cur === "Date Range" ? date : value}`);
        setLoader(false);
        console.log(response)
        if(response.data.data==="Invalid date format!!"){
            toast.warning(`Invalid date format!!`)   
        }
        
        else if(response.data.data==="Server Error!!"){
            toast.error(`Server Error!!`)   
        }


        else if (response.data.data==="0"){
            toast.error(`Kindly check the file y'attached!! `)  
        }
        else{
            toast.success(`You have ${response.data.data} records`)   
        }
        }
        catch (error) {
        console.error('Error fetching data:', error);
      }


    }
    return(
        <div className="userinterface">
            <div className="userinterface__container">
                <h2 className="h2">TimeStamp</h2>
                <span style={{ backgroundColor: cur === "YYYY" ? "rgb(225, 225, 225)" : "#fff" }} onClick={()=> {setCur("YYYY"); setValue("")}}>YYYY</span>
                <span style={{ backgroundColor: cur === "YYYY-MM" ? "rgb(225, 225, 225)" : "#fff" }} onClick={()=> {setCur("YYYY-MM");setValue("")}}>YYYY-MM</span>
                <span style={{ backgroundColor: cur === "YYYY-MM-DD" ? "rgb(225, 225, 225)" : "#fff" }} onClick={()=> {setCur("YYYY-MM-DD");setValue("")}}>YYYY-MM-DD</span>
                <span style={{ backgroundColor: cur === "Date Range" ? "rgb(225, 225, 225)" : "#fff" }} onClick={()=> {setCur("Date Range");setValue("")}}>Date Range</span>
                
                {cur==="YYYY" && <>
                <div className="flex just">
                        {/* <label>YYYY</label> */}
                        <input required minLength={4} maxLength={4}onChange={(e) => setValue(e.target.value)} value={value} type="text"></input>
                        <p>{4-value.toString().length} Characters left</p>
                    </div>
                
                </>}

                {cur==="YYYY-MM" && <>
                <div className="flex just">
                        {/* <label>YYYY</label> */}
                        <input required minLength={7} maxLength={7}onChange={(e) => setValue(e.target.value)} value={value} type="text"></input>
                        <p>{7-value.toString().length} Characters left</p>
                    </div>
                
                </>}

                {cur==="YYYY-MM-DD" && <>
                <div className="flex just">
                        {/* <label>YYYY</label> */}
                        <input required minLength={10} maxLength={10}onChange={(e) => setValue(e.target.value)} value={value} type="text"></input>
                        <p>{10-value.toString().length} Characters left</p>
                    </div>
                
                </>}


                {cur==="Date Range" && <>
                    <div className="flex just">
                        <label>From (YYYY-MM-DD HH:MM:SS)</label>
                        <input required minLength={19} onChange={(e) => updateStartDate(e.target.value)} value={startDate} type="text"></input>
                        <p>{startCount} Characters left</p>
                    </div>

                    <div className="flex">
                        <label>To (YYYY-MM-DD HH:MM:SS)</label>
                        <input required minLength={19} onChange={(e) => updateEndDate(e.target.value)} value={endDate} type="text"></input>
                        <p>{endCount} Characters left</p>
                    </div>
                </>}

                <div onClick={fetchData} className="button">Get Count</div>
                <div style={{fontSize:"1.2rem", letterSpacing:"0.3px"}}><ToastContainer /></div>
            </div>
            {loader && <Box sx={{ display: 'flex', position:"absolute"}}>
                 <CircularProgress />
            </Box>
            }
        </div>
    );
}

export default UserInterface;