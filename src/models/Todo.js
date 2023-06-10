const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    task: String,
    owner: String
});

module.exports = mongoose.model("Todo", schema);