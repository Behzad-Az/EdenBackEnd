import { v4 as uuidv4 } from 'uuid';
const users = [];

export const getUsers = (req, res) => {
  res.send(users);
};

export const getUser = (req, res) => {
  const foundUser = users.find(user => user.id === req.params.id);
  res.send(foundUser);
};

export const createUser = (req, res) => {
  const user = {
    id: uuidv4(),
    ...req.body
  };
  users.push(user);
  res.send(`Inserted user with ID ${user.id}`);
};

export const patchUser = (req, res) => {
  const userIndex = users.findIndex(user => user.id === req.params.id);
  if (userIndex > -1) {
    users[userIndex] = {
      ...users[userIndex],
      ...req.body
    };
  }
  res.send(`User with the id ${req.params.id} updated in database`);
};

export const deleteUser = (req, res) => {
  const userIndex = users.findIndex(user => user.id === req.params.id);
  if (userIndex > -1) {
    users.splice(userIndex, 1);
  }
  res.send(`User with the id ${req.params.id} removed from database`);
};