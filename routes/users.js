import express from 'express';

import { 
  getUsers,
  postLogin,
  createUser
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);

router.post('/login', postLogin);
router.post('/', createUser);

// router.delete('/:id', deleteUser);

// Use put for when you completely overwrite an entry. Use patch when you update an entry partially.
// router.patch('/:id', patchUser);

export default router;