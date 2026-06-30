const Item = require("../models/Item");

const createItem = async (req, res) => {
  try {

    const item = await Item.create({
      title: req.body.title,
      description: req.body.description,
      pricePerDay: req.body.pricePerDay,
      category: req.body.category,
      location: req.body.location,
      contactNumber: req.body.contactNumber,
      image: req.body.image,
      owner: req.body.owner
    });

    res.status(201).json(item);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getItems = async (req, res) => {

  try {

    const items = await Item.find().populate(
        "owner",
        "fullName"
       );

    res.json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getItemById = async (req, res) => {

  try {

      const item =
      await Item.findById(req.params.id)
      .populate("owner", "fullName email");

      if(!item){

          return res.status(404).json({
              message:"Item not found"
          });

      }

      res.json(item);

  }

  catch(error){

      res.status(500).json({
          message:error.message
      });

  }

};

const getMyItems = async (req, res) => {

  try {

      const items = await Item.find({
          owner: req.params.userId
      }).populate("owner", "fullName");

      res.json(items);

  }

  catch (err) {

      res.status(500).json({
          message: err.message
      });

  }

};

const deleteItem = async (req, res) => {

  try {

      const item = await Item.findById(req.params.id);

      if (!item) {

          return res.status(404).json({
              message: "Item not found"
          });

      }

      await item.deleteOne();

      res.json({
          message: "Item deleted successfully"
      });

  }

  catch (err) {

      res.status(500).json({
          message: err.message
      });

  }

};

module.exports = {
  createItem,
  getItems,
  getItemById,
  getMyItems,
  deleteItem
};