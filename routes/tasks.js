const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//create task
// api/tasks
router.post('/',
    auth,
    [
        check('name', 'The task name is required').not().isEmpty(),
        check('project', 'The project id is required').not().isEmpty()
    ],
    taskController.createTask
);

//get tasks by project
router.get('/',
    auth,
    [
        check('project', 'The project id is required').not().isEmpty()
    ],
    taskController.getTasks
)

module.exports = router;