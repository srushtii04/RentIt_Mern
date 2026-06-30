const express=require("express");

const router=express.Router();

const{

createRentalRequest,
getOwnerRentals,
getRenterRequests,
approveRental,
rejectRental

}=require("../controllers/rentalController");

router.post("/request",createRentalRequest);

//added
router.get("/owner/:ownerId",getOwnerRentals);

router.get("/renter/:renterId",getRenterRequests);

router.put("/:id/approve",approveRental);

router.put("/:id/reject",rejectRental);

module.exports=router;