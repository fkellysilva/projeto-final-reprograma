const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  _id: {
    type:mongoose.Schema.Types.ObjectId, 
    default: () => new mongoose.Types.ObjectId()
  }, 
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, 

{timestamp:true}

);
const Model = mongoose.model("Category",categorySchema)


module.exports = Model;
