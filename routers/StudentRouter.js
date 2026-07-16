import express from 'express'
import Student from '../models/student.js';
import { createStudent } from '../Controllers/StudentController.js';

const studentRouter = express.Router();

studentRouter.post("/",createStudent)


export default studentRouter