const Task = require('../models/TaskModel');
const Project = require('../models/ProjectModel');
const {validationResult, body} = require('express-validator');

//Create a new task
exports.createTask = async (req, res) => {
    
    //Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
 
    try {
        //extract project and check if exists
        const {project} = req.body;

        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).json({msg: 'Project not found'});
        }

        //Check if the user owns the project
        if (existProject.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        const task = new Task(req.body);
        await task.save();
        res.json({task});

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error.');
    }

}

//get tasks by project
exports.getTasks = async (req, res) => {
    try {
        //extract project and check if exists
        const {project} = req.body;

        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).json({msg: 'Project not found'});
        }

        //Check if the user owns the project
        if (existProject.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        //get tasks
        const tasks = await Task.find({project});
        res.json(tasks);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error.');
    }
}

//update tasks by project
exports.updateTask = async (req, res) => {
    try {
        
        //extract project and check if exists
        const {project, name, state} = req.body;

        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({msg: 'Task not found'});
        }

        const existProject = await Project.findById(project);

        //Check if the user owns the project
        if (existProject.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }
        
        //create new object with new status
        const newTask = {};
        if (name) newTask.name = name;
        if (state) newTask.state = state;

        //save the task
        task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true});

        res.json({task});

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error.');
    }
}