import { v4 as uuidv4 } from 'uuid';
import knex from 'knex';
import bcrypt from 'bcrypt';

import config from '../knexfile.js';
const db = knex(config.development);

export const getUsers = async (req, res) => {
  try {
    const users = await db('users').whereNull('deleted_at');
    res.status(200).json(users);
  } 
  catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const postLogin = async (req, res) => {
  try {
    const { email, password: givenPassword } = req.body;
    const [foundUser] = await db('users')
      .where({ email })
      .whereNull('deleted_at');

    if (!foundUser?.password) {
      throw new Error ('No user with given credentials was found');
    }
    const authenticated = await bcrypt.compare(givenPassword, foundUser.password);
    if (authenticated) {
      await db('users').where({ id: foundUser.id }).update({ last_login: db.fn.now() });
      delete foundUser.password;
      res.status(200).json(foundUser);
    }
    else {
      throw new Error ('No user with given credentials was found');
    }
  } 
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 5);
    const newUser = {
      id: uuidv4(),
      ...req.body,
      password
    };
    await db('users').insert(newUser);
    res.status(200).json(newUser);
  } 
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};