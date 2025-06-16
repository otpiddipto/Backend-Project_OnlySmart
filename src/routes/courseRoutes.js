const express = require('express');
const {getCourses, getCourseById, createCourse, updateCourse, getUserById } = require('../controllers/courseController');
const {authenticate} = require('../middleware/authMiddleware');


const router = express.Router();
// console.log(typeof authenticate); // harus "function"
// console.log(typeof getCourses); // harus "function"


router.get('/', getCourses);
router.get('/:id', getCourseById);
router.get('/user/:id', getUserById); // Assuming you want to get user by ID with authentication
router.post('/', authenticate, createCourse);
router.put('/:id', authenticate, updateCourse);




module.exports = router;
