import { v4 as uuidv4 } from 'uuid';
import knex from 'knex';
import config from '../knexfile.js';
const db = knex(config.development);

export const getProperties = async (req, res) => {
  try {
    const properties = await db('properties')
      .where({ status: 'active' })
      .whereNull('deleted_at');
    res.status(200).json(properties);
  }
  catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createProperty = async (req, res) => {
  const newProperty = {
    id: uuidv4(),
    ...req.body
  };
  try {
    await db('properties').insert(newProperty);
    res.status(200).json(newProperty);
  } 
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    await db.raw('PRAGMA foreign_keys = ON;');
    const deletedItemCount = await db('properties').where({ id }).del();
    res.status(200).json({ deletedItemCount });
  } 
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};