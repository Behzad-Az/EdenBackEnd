import { v4 as uuidv4 } from 'uuid';
import knex from 'knex';
import config from '../knexfile.js';
const db = knex(config.development);

export const getProjects = async (req, res) => {
  try {
    const projects = await db('projects')
      .where({ status: 'active' })
      .whereNull('deleted_at');
    res.status(200).json(projects);
  }
  catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    await db.raw('PRAGMA foreign_keys = ON;');
    const newProject = {
      id: uuidv4(),
      ...req.body
    };
    await db('projects').insert(newProject);
    res.status(200).json(newProject);
  }
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};