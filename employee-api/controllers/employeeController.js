import employeeModel from '../models/employee.js';

const getEmployeeByNameAndAge = async (req, res) => {
    const { name, age } = req.query;
    console.log(`Received parameters - Name: ${name}, Age: ${age}`);

    try {
        const ageInt = parseInt(age, 10);
        if (isNaN(ageInt)) {
            return res.status(400).send('Invalid age parameter');
        }
        const employees = await employeeModel.findByNameAndAge(name, ageInt);
        res.json(employees);
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).send('Internal Server Error');
    }
};

const getAllEmployees = async (req, res) => {
    try {

        const data = await employeeModel.findAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addEmployee = async (req, res) => {
    const { id, name, age, email } = req.body;

    try {
        const ageInt = parseInt(age, 10);
        if (isNaN(ageInt)) {
            return res.status(400).send('Invalid age parameter');
        }
        await employeeModel.add(id, name, ageInt, email);
        res.status(201).json({ message: 'Employee added successfully' });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export default {
    getEmployeeByNameAndAge,
    getAllEmployees,
    addEmployee
};
