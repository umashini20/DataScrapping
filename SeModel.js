const mongoose =require("mongoose");

const SeModel = mongoose.model(
    "SeModel",
    mongoose.Schema({
        scrapeResults : []
    })
);
module.exports = SeModel;