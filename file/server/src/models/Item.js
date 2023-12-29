const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [20, "Name cannot be more than 20 characters"]
    },
    file: {
        type: String,
        required: [true, "Please provide a file"]
    }
});

const Item = mongoose.model("files", itemSchema);

module.exports = Item;