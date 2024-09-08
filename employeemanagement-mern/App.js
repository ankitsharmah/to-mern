const express = require('express');
const app = express();
const empModel = require('./usermodel');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Get all employees
app.get('/', async (req, res) => {
    console.log("called")
    try {
        const emps = await empModel.find();
        res.status(200).send({data:emps,
            success:true});
    } catch (error) {
        res.status(500).send({ message: 'Error fetching employees', error });
    }
});

app.delete("/delete/:id",async (req,res)=>{

    try {
        const id = req.params.id
        const deleted = await empModel.findOneAndDelete({ _id: id });
        console.log("dalete ",deleted)
        return res.status(200).json({message:"deleted successfull",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
});

// Update an employee by ID
app.put('/update/:id', async (req, res) => {
    try {
        console.log("data ",req.body)
        const updated = await empModel.findOneAndUpdate(
            { _id: req.params.id },
            { name: req.body.name, email: req.body.email, salary: req.body.salary, position: req.body.position },
            { new: true }
        );
        console.log(updated)

        if (!updated) {
            return res.status(404).send({ message: 'Employee not found' });
        }

        res.status(200).send({data:updated,
            success:true});
    } catch (error) {
        res.status(500).send({ message: 'Error updating employee', error
         });
    }
});

// Create a new employee
app.post('/create', async (req, res) => {
    try {
        const resu = await empModel.create({
            name: req.body.name || 'Ankit Sharma',
            email: req.body.email || 'asrover2029@gmail.com',
            salary: req.body.salary || '60000',
            position: req.body.position || 'Associate Software Developer'
        });

        res.status(201).send({
            data:resu,
            
            success:true
        });
    } catch (error) {
        res.status(500).send({ message: 'Error creating employee', error });
    }
});

app.listen(8181, () => {
    console.log('Server is running on port 8181');
});
