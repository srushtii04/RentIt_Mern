const RentalRequest=require("../models/RentalRequest");
const Item=require("../models/Item");

const createRentalRequest=async(req,res)=>{

try{

const{
item,
owner,
renter,
startDate,
endDate,
totalPrice
}=req.body;

const request=await RentalRequest.create({

item,
owner,
renter,
startDate,
endDate,
totalPrice

});

await Item.findByIdAndUpdate(

item,

{

status:"unavailable"

}

);

res.status(201).json(request);

}

catch(err){

res.status(500).json({

message:err.message

});

}

};

//added
const getOwnerRentals=async(req,res)=>{

    try{
    
    const rentals=await RentalRequest.find({
    
    owner:req.params.ownerId
    
    })
    
    .populate("item")
    
    .populate("renter","fullName");
    
    res.json(rentals);
    
    }
    
    catch(err){
    
    res.status(500).json({
    
    message:err.message
    
    });
    
    }
    
    };
    
    const getRenterRequests=async(req,res)=>{
    
    try{
    
    const requests=await RentalRequest.find({
    
    renter:req.params.renterId
    
    })
    
    .populate("item")
    
    .populate("owner","fullName");
    
    res.json(requests);
    
    }
    
    catch(err){
    
    res.status(500).json({
    
    message:err.message
    
    });
    
    }
    
    };
    
    const approveRental=async(req,res)=>{
    
    try{
    
    const rental=await RentalRequest.findById(req.params.id);
    
    rental.status="approved";
    
    await rental.save();
    
    await Item.findByIdAndUpdate(
    
    rental.item,
    
    {
    
    status:"rented"
    
    }
    
    );
    
    res.json({
    
    message:"Approved"
    
    });
    
    }
    
    catch(err){
    
    res.status(500).json({
    
    message:err.message
    
    });
    
    }
    
    };
    
    const rejectRental=async(req,res)=>{
    
    try{
    
    const rental=await RentalRequest.findById(req.params.id);
    
    rental.status="rejected";
    
    await rental.save();
    
    await Item.findByIdAndUpdate(
    
    rental.item,
    
    {
    
    status:"available"
    
    }
    
    );
    
    res.json({
    
    message:"Rejected"
    
    });
    
    }
    
    catch(err){
    
    res.status(500).json({
    
    message:err.message
    
    });
    
    }
    
    };
    

module.exports={

createRentalRequest,
getOwnerRentals,
getRenterRequests,
approveRental,
rejectRental

};