"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.createStudent = exports.getAllStudents = void 0;
const student_1 = __importDefault(require("../models/student"));
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield student_1.default.find();
        res.render('students/index', { students });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
});
exports.getAllStudents = getAllStudents;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, age } = req.body;
        const newStudent = new student_1.default({ name, email, age });
        yield newStudent.save();
        res.redirect('/');
    }
    catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Error creating student', error });
    }
});
exports.createStudent = createStudent;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield student_1.default.findById(req.params.id);
        if (student) {
            res.render('students/edit', { student });
        }
        else {
            res.status(400).json({ message: 'Student not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
});
exports.getStudentById = getStudentById;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, age } = req.body;
        yield student_1.default.findByIdAndUpdate(req.params.id, { name, email, age });
        res.redirect('/');
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield student_1.default.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
});
exports.deleteStudent = deleteStudent;
