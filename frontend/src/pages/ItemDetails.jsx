import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { getItemById } from "../services/itemService";
import {requestRental} from "../services/rentalService";

function ItemDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);

    const [startDate, setStartDate] = useState("");

    const [endDate, setEndDate] = useState("");

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {fetchItem();}, []);

    const fetchItem = async () => {

        try {
            const data = await getItemById(id);
            setItem(data);
        }

        catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        if (!startDate || !endDate || !item)
            return;

        const start = new Date(startDate);

        const end = new Date(endDate);

        const difference =
            Math.ceil(
                (end - start) /
                (1000 * 60 * 60 * 24)
            ) + 1;

        if (difference > 0) {

            setTotalPrice(
                difference *
                item.pricePerDay
            );

        }

    }, [startDate, endDate, item]);

    if (!item) {

        return (

            <div
                className="
                h-screen
                flex
                justify-center
                items-center
                text-xl
                "
            >
                Loading...

            </div>

        );

    }

    const handleRequest=async()=>{

        try{
        
        const user=JSON.parse(
        
        localStorage.getItem("user")
        
        );
        
        await requestRental({
        
        item:item._id,
        
        owner:item.owner._id,
        
        renter:user._id,
        
        startDate,
        
        endDate,
        
        totalPrice
        
        });
        
        alert("Rental Request Sent Successfully");
        
        navigate("/");
        
        }
        
        catch(err){
        
        console.log(err);
        
        }
        
        };

    return (
        <div className="min-h-screen bg-[#f7f5fb]">
        
        <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-3 px-6 py-4">
        <button onClick={() => navigate(-1)}>
        <FiArrowLeft size={24} className="text-purple-600"/>
        </button>
        
        <h1 className="text-2xl font-bold text-purple-600">
        Item Details
        </h1>
        </div>
        </div>
        
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg mt-8 overflow-hidden">
        
        <div className="grid lg:grid-cols-2">
        
        <div className="bg-gray-100">
        <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
        />
        </div>
        
        <div className="p-8">
        
        <div className="flex justify-between items-center">
        
        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
        {item.category}
        </span>
        
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${item.status==="available"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>
        {item.status}
        </span>
        
        </div>
        
        <h1 className="text-4xl font-bold mt-5">
        {item.title}
        </h1>
        
        <p className="text-gray-600 mt-5 leading-8">
        {item.description}
        </p>
        
        <div className="mt-6">
        
        <h2 className="text-3xl font-bold text-purple-600">
        ₹{item.pricePerDay}
        <span className="text-lg text-gray-500 font-normal">
         / day
        </span>
        </h2>
        
        </div>
        
        <div className="flex items-center gap-2 mt-6 text-gray-700">
        <FiMapPin/>
        <span>{item.location}</span>
        </div>
        
        <div className="border-t mt-8 pt-6">
        
        <h2 className="text-xl font-semibold mb-4">
        Owner Details
        </h2>
        
        <div className="space-y-4">
        
        <div className="flex items-center gap-3">
        <FiUser className="text-purple-600"/>
        <span>{item.owner.fullName}</span>
        </div>
        
        <div className="flex items-center gap-3">
        <FiPhone className="text-purple-600"/>
        <span>{item.contactNumber}</span>
        </div>
        
        </div>
        
        </div>

        {/* Booking Section */}

<div className="border-t mt-8 pt-6">

<h2 className="text-xl font-semibold mb-5">
Booking Details
</h2>

<div className="grid md:grid-cols-2 gap-5">

<div>

<label className="block text-sm font-medium mb-2">
Start Date
</label>

<input
type="date"
min={new Date().toISOString().split("T")[0]}
value={startDate}
onChange={(e)=>setStartDate(e.target.value)}
className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
/>

</div>

<div>

<label className="block text-sm font-medium mb-2">
End Date
</label>

<input
type="date"
min={startDate || new Date().toISOString().split("T")[0]}
value={endDate}
onChange={(e)=>setEndDate(e.target.value)}
className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
/>

</div>

</div>

<div className="bg-purple-50 rounded-2xl p-5 mt-6">

<div className="flex justify-between mb-3">

<span className="font-medium">
Daily Rent
</span>

<span>
₹{item.pricePerDay}
</span>

</div>

<div className="flex justify-between mb-3">

<span className="font-medium">
Total Rent
</span>

<span className="text-xl font-bold text-purple-600">
₹{totalPrice}
</span>

</div>

</div>

<button
disabled={
item.status!=="available" ||
!startDate ||
!endDate    
}
className={`w-full mt-6 py-4 rounded-xl text-white text-lg font-semibold transition ${
item.status==="available"
? "bg-purple-600 hover:bg-purple-700"
: "bg-gray-400 cursor-not-allowed"
}`} onClick={handleRequest}
>

{
item.status==="available"?"Request to Rent":"Currently Unavailable"
}

</button>

</div>

</div>

</div>

</div>

</div>

);

}

export default ItemDetails;
