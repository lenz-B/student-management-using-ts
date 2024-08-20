import express from 'express'
import * as studentController from '../controllers/studentController'

const router = express.Router();

router.get('/', studentController.getAllStudents)
router.post('/', studentController.createStudent)
router.get('/create', (req, res) => res.render('students/create'))
router.get('/:id', studentController.getStudentById)
router.post('/:id', studentController.updateStudent)
router.post('/:id/delete', studentController.deleteStudent)

export default router