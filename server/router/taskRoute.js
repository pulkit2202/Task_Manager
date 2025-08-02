const router = require('express').Router();
const path = require('path');
const upload = require('../middleware/upload');
const {
  createTaskPostController,
  getTaskController,
  getSingleTaskController,
  editTaskController,
  setCompleteController,
  setImportantController,
  deleteTaskController,
  recentTaskController
} = require('../controllers/taskController');

const { authState } = require('../middleware/authMiddleware');

// Create task with file upload
router.post('/create', authState, upload.array('documents', 3), createTaskPostController);

// View file
router.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
  res.sendFile(filePath);
});

router.post('/', authState, getTaskController);
router.post('/update/:id', authState, editTaskController);
router.post('/complete/:id', authState, setCompleteController);
router.post('/important/:id', authState, setImportantController);
router.post('/delete/:id', authState, deleteTaskController);
router.post('/recent', authState, recentTaskController);
router.get('/:id', authState, getSingleTaskController);

module.exports = router;
