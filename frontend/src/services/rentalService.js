import axios from "axios";

const API="http://localhost:5000/api/rentals";

export const requestRental=async(data)=>{

const res=await axios.post(

`${API}/request`,

data

);

return res.data;

};