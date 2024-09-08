const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/emp`);

const employeeSchema= mongoose.Schema({
    name: String,
    email : String,
    salary : String,
    position: String
})

module.exports= mongoose.model("employee",employeeSchema)