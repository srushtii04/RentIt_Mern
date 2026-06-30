import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {
FiArrowLeft,
FiTrash2,
FiPackage,
FiCalendar,
FiUser,
FiCheck,
FiX
} from "react-icons/fi";

function Profile(){

const navigate=useNavigate();

const user=JSON.parse(localStorage.getItem("user"));

const[token]=useState(localStorage.getItem("token"));

const[selectedTab,setSelectedTab]=useState("items");

const[myItems,setMyItems]=useState([]);

const[myRentals,setMyRentals]=useState([]);

const[myRequests,setMyRequests]=useState([]);

useEffect(()=>{

fetchMyItems();
fetchMyRentals();
fetchMyRequests();

},[]);

const fetchMyItems=async()=>{

try{

const res=await axios.get(

`http://localhost:5000/api/items/my-items/${user._id}`

);

setMyItems(res.data);

}

catch(err){

console.log(err);

}

};

const fetchMyRentals=async()=>{

try{

const res=await axios.get(

`http://localhost:5000/api/rentals/owner/${user._id}`

);

setMyRentals(res.data);

}

catch(err){

console.log(err);

}

};

const fetchMyRequests=async()=>{

try{

const res=await axios.get(

`http://localhost:5000/api/rentals/renter/${user._id}`

);

setMyRequests(res.data);

}

catch(err){

console.log(err);

}

};

const deleteItem=async(id)=>{

const ok=window.confirm("Delete this item?");

if(!ok)return;

try{

await axios.delete(

`http://localhost:5000/api/items/${id}`

);

fetchMyItems();

}

catch(err){

console.log(err);

}

};

const approveRental=async(id)=>{

try{

await axios.put(

`http://localhost:5000/api/rentals/${id}/approve`

);

fetchMyRentals();

fetchMyItems();

}

catch(err){

console.log(err);

}

};

const rejectRental=async(id)=>{

try{

await axios.put(

`http://localhost:5000/api/rentals/${id}/reject`

);

fetchMyRentals();

fetchMyItems();

}

catch(err){

console.log(err);

}

};

return(

<div className="min-h-screen bg-[#f7f5fb]">

<div className="bg-white shadow-sm">

<div className="max-w-6xl mx-auto flex items-center gap-4 px-6 py-5">

<button onClick={()=>navigate("/")}>
<FiArrowLeft size={24} className="text-purple-600"/>
</button>

<h1 className="text-2xl font-bold text-purple-600">
Profile
</h1>

</div>

</div>

<div className="max-w-6xl mx-auto p-6">

<div className="bg-white rounded-3xl shadow-md p-8 flex items-center gap-6">

<div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white flex items-center justify-center text-5xl font-bold">

{user.fullName.charAt(0).toUpperCase()}

</div>

<div>

<h1 className="text-4xl font-bold">

{user.fullName}

</h1>

<p className="text-gray-500 text-lg mt-1">

{user.email}

</p>

<div className="mt-4 inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-5 py-2 rounded-full">

✨ Active Member

</div>

</div>

</div>

<div className="grid grid-cols-3 gap-4 mt-6">

<button
onClick={()=>setSelectedTab("items")}
className={`${selectedTab==="items"?"bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white":"bg-white"} rounded-2xl shadow-md py-5 text-lg font-semibold flex justify-center items-center gap-2`}
>

<FiPackage/>

My Items ({myItems.length})

</button>

<button
onClick={()=>setSelectedTab("rentals")}
className={`${selectedTab==="rentals"?"bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white":"bg-white"} rounded-2xl shadow-md py-5 text-lg font-semibold flex justify-center items-center gap-2`}
>

<FiCalendar/>

My Rentals ({myRentals.length})

</button>

<button
onClick={()=>setSelectedTab("requests")}
className={`${selectedTab==="requests"?"bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white":"bg-white"} rounded-2xl shadow-md py-5 text-lg font-semibold flex justify-center items-center gap-2`}
>

<FiUser/>

My Requests ({myRequests.length})

</button>

</div>

{/* -------------------- MY ITEMS -------------------- */}

{selectedTab==="items" && (

<div className="mt-8 space-y-5">

{myItems.length===0?(
<div className="bg-white rounded-3xl shadow-md p-16 text-center">
<h2 className="text-2xl font-semibold text-gray-500">
No Items Posted Yet
</h2>
<p className="text-gray-400 mt-2">
Post your first rental item.
</p>
</div>
):(

myItems.map((item)=>(

<div key={item._id} className="bg-white rounded-3xl shadow-md p-5 flex flex-col md:flex-row gap-5">

<img
src={item.image}
alt={item.title}
className="w-full md:w-44 h-40 object-cover rounded-2xl"
/>

<div className="flex-1 flex flex-col justify-between">

<div>

<div className="flex justify-between items-start">

<div>

<h2 className="text-2xl font-bold">
{item.title}
</h2>

<p className="text-gray-500 mt-2">
{item.description}
</p>

</div>

<div className={`px-4 py-2 rounded-full text-sm font-semibold ${
item.status==="available"
?"bg-green-100 text-green-700"
:item.status==="unavailable"
?"bg-yellow-100 text-yellow-700"
:"bg-red-100 text-red-700"
}`}>

{item.status}

</div>

</div>

<div className="flex gap-6 mt-5 text-gray-600">

<div>

<p className="text-sm text-gray-400">
Category
</p>

<p className="font-medium">
{item.category}
</p>

</div>

<div>

<p className="text-sm text-gray-400">
Location
</p>

<p className="font-medium">
{item.location}
</p>

</div>

</div>

</div>

<div className="flex justify-between items-center mt-6">

<h2 className="text-3xl font-bold text-purple-600">
₹{item.pricePerDay}
<span className="text-base text-gray-500">
 /day
</span>
</h2>

<button
onClick={()=>deleteItem(item._id)}
className="text-red-500 hover:text-red-700 transition"
>

<FiTrash2 size={26}/>

</button>

</div>

</div>

</div>

))

)}

</div>

)}  

{/* -------------------- MY RENTALS -------------------- */}

{selectedTab==="rentals" && (

<div className="mt-8 space-y-5">

{myRentals.length===0?(
<div className="bg-white rounded-3xl shadow-md p-16 text-center">

<h2 className="text-2xl font-semibold text-gray-500">
No Rental Requests
</h2>

<p className="text-gray-400 mt-2">
Requests from renters will appear here.
</p>

</div>

):(myRentals.map((rental)=>(

<div
key={rental._id}
className="bg-white rounded-3xl shadow-md p-5 flex flex-col md:flex-row gap-5"
>

<img
src={rental.item.image}
alt={rental.item.title}
className="w-full md:w-44 h-40 object-cover rounded-2xl"
/>

<div className="flex-1">

<div className="flex justify-between">

<div>

<h2 className="text-2xl font-bold">
{rental.item.title}
</h2>

<p className="text-gray-500 mt-2">
Requested By
<b className="ml-1">
{rental.renter.fullName}
</b>
</p>

<p className="text-gray-500 mt-2">
{new Date(rental.startDate).toLocaleDateString()}
{"  "} - {"  "}
{new Date(rental.endDate).toLocaleDateString()}
</p>

</div>

<div className={`px-4 py-2 rounded-full text-sm font-semibold ${
rental.status==="pending"
?"bg-yellow-100 text-yellow-700"
:rental.status==="approved"
?"bg-green-100 text-green-700"
:"bg-red-100 text-red-700"
}`}>

{rental.status}

</div>

</div>

<div className="flex justify-between items-center mt-8">

<div>

<h2 className="text-3xl font-bold text-purple-600">

₹{rental.totalPrice}

</h2>

<p className="text-gray-400">
Total Rental Amount
</p>

</div>

{rental.status==="pending"&&(

<div className="flex gap-4">

<button
onClick={()=>approveRental(rental._id)}
className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
>

<FiCheck/>

Approve

</button>

<button
onClick={()=>rejectRental(rental._id)}
className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
>

<FiX/>

Reject

</button>

</div>

)}

</div>

</div>

</div>

)))}

</div>

)}

{/* -------------------- MY REQUESTS -------------------- */}

{selectedTab==="requests" && (

<div className="mt-8 space-y-5">

{myRequests.length===0?(
<div className="bg-white rounded-3xl shadow-md p-16 text-center">

<h2 className="text-2xl font-semibold text-gray-500">
No Requests Made
</h2>

<p className="text-gray-400 mt-2">
Rental requests you send will appear here.
</p>

</div>

):(myRequests.map((request)=>(

<div
key={request._id}
className="bg-white rounded-3xl shadow-md p-5 flex flex-col md:flex-row gap-5"
>

<img
src={request.item.image}
alt={request.item.title}
className="w-full md:w-44 h-40 object-cover rounded-2xl"
/>

<div className="flex-1">

<div className="flex justify-between">

<div>

<h2 className="text-2xl font-bold">
{request.item.title}
</h2>

<p className="text-gray-500 mt-2">
Owner :
<b className="ml-2">
{request.owner.fullName}
</b>
</p>

<p className="text-gray-500 mt-2">
{new Date(request.startDate).toLocaleDateString()}
{" - "}
{new Date(request.endDate).toLocaleDateString()}
</p>

</div>

<div
className={`px-4 py-2 rounded-full text-sm font-semibold ${
request.status==="pending"
?"bg-yellow-100 text-yellow-700"
:request.status==="approved"
?"bg-green-100 text-green-700"
:"bg-red-100 text-red-700"
}`}
>

{request.status}

</div>

</div>

<div className="flex justify-between items-center mt-8">

<div>

<h2 className="text-3xl font-bold text-purple-600">
₹{request.totalPrice}
</h2>

<p className="text-gray-400">
Total Rental Cost
</p>

</div>

</div>

</div>

</div>

)))}

</div>

)}

</div>

</div>

);

}

export default Profile;