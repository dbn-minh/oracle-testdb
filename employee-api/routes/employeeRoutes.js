import express from 'express';
import employeeController from '../controllers/employeeController.js';

const router = express.Router();

// Define the route to get employees by name and age
router.get('/employee', employeeController.getEmployeeByNameAndAge);

router.get('/employees', employeeController.getAllEmployees); // GET all employees

router.post('/employees', express.json(), employeeController.addEmployee); // POST a new employee

export default router;
