import express from 'express';

import { 
  getInvestments,
  createInvestment
} from '../controllers/investments.js';

const router = express.Router();

router.get('/', getInvestments);

router.post('/', createInvestment);

// router.delete('/:id', deleteUser);

// Use put for when you completely overwrite an entry. Use patch when you update an entry partially.
// router.patch('/:id', patchUser);

export default router;