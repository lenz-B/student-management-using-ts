import { Request, Response } from 'express';
import Student from '../models/student';

export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find()
    res.render('students/index', { students })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error })
  }
}

export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, age } = req.body;
    
    const newStudent = new Student({ name, email, age });
    await newStudent.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Error creating student', error });
  }
};

export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await Student.findById(req.params.id)
    if (student) {
      res.render('students/edit', { student })
    } else {
      res.status(400).json({ message: 'Student not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error })
  }
}

export const updateStudent = async (req:Request, res: Response) : Promise<void> => {
  try {
    const {name, email, age} = req.body
    await Student.findByIdAndUpdate(req.params.id, {name, email, age})
    res.redirect('/')
  } catch (error) {
    res.status(500).json({message: 'Error updating student', error})
  }
}

export const deleteStudent = async (req:Request, res: Response): Promise<void> => {
  try {
    await Student.findByIdAndDelete(req.params.id)
    res.redirect('/')
  } catch (error) {
    res.status(500).json({message: 'Error deleting student', error})
  }
}