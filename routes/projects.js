const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


//Create projects
// api/projects
router.post('/',
    auth,
    [
        check('name', 'The name of the project is required.').not().isEmpty()
    ], 
    projectController.createProject)

//get projects by user    
router.get('/',
    auth,
    projectController.getProjects)

//update projects    
router.put('/:id',
    auth,
    [
        check('name', 'The name of the project is required.').not().isEmpty()
    ],  
    projectController.updateProject)

//delete projects
router.delete('/:id',
    auth,
    projectController.deleteProject)    

module.exports = router;