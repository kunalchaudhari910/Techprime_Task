const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Inserting Project
router.post('/project', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Getting All Projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Updating Project Status
router.put('/project/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.status = req.body.status;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
