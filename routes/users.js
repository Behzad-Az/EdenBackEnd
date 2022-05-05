import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const users = [];

router.get('/', (req, res) => {
  res.send(users);
});

router.post('/', (req, res) => {
  const user = {
    id: uuidv4(),
    ...req.body
  };
  users.push(user);
  res.send(`Inserted user with ID ${user.id}`);
});

router.get('/:id', (req, res) => {
  const foundUser = users.find(user => user.id === req.params.id);
  res.send(foundUser);
});

router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(user => user.id === req.params.id);
  if (userIndex > -1) {
    users.splice(userIndex, 1);
  }
  res.send(`User with the id ${req.params.id} removed from database`);
});

export default router;