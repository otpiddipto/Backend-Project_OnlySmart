const express = require('express');
const lessonController = require('../controllers/lessonController');
const router = express.Router();

router.get('/', lessonController.getLessons);
router.get('/:id', lessonController.getLessonById);
router.post('/', lessonController.createLesson);

module.exports = router;
