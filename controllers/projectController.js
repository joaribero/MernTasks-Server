const Project = require('../models/ProjectModel');
const {validationResult} = require('express-validator');

exports.createProject = async (req, res) => {
    
    //Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        //create new project
        const project = new Project(req.body);

        //save author with jwt
        project.author = req.user.id;

        //save the project
        project.save();
        res.json(project);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error')
    }
}

//get all projects of current user
exports.getProjects = async (req, res) => {
    try {

        //retrieve all projects by user and order by create date desc
        const projects =   await Project.find({author: req.user.id}).sort({created: -1});
        res.json({projects});      
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error.');
    }

}

//update project
exports.updateProject = async (req, res) => {
    
    //Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    //extract info from project
    const {name} = req.body;
    const newProject = {};

    if(name) {
        newProject.name = name;
    }

    try {
        
        //Check id
        let project = await Project.findById(req.params.id);

        //if project exist
        if (!project) {
            return res.status(404).json({msg: 'Project not found'});
        }

        //verify the author
        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        //update finally
        project = await Project.findByIdAndUpdate({_id: req.params.id}, {$set: newProject}, {new: true});
        res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}