import express from 'express';

import { 
  getProperties,
  createProperty,
  deleteProperty
} from '../controllers/properties.js';

const router = express.Router();

router.get('/', getProperties);

router.post('/', createProperty);

router.delete('/:id', deleteProperty);

export default router;