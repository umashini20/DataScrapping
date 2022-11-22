const mongoose =require("mongoose");

const PagesModel = mongoose.model(
    "PagesModel",
    mongoose.Schema({
      
        scrapeResults : []
    })
);
module.exports = PagesModel;