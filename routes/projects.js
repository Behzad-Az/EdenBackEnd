import express from 'express';

import { 
  getProjects, 
  createProject
} from '../controllers/Projects.js';

const router = express.Router();

router.get('/', getProjects);
// router.get('/:id', getProject);

router.post('/', createProject);

// router.delete('/:id', deleteProject);

// Use put for when you completely overwrite an entry. Use patch when you update an entry partially.
// router.patch('/:id', patchProject);

export default router;