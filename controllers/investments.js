import { v4 as uuidv4 } from 'uuid';
import knex from 'knex';
import config from '../knexfile.js';
const db = knex(config.development);

export const getInvestments = async (req, res) => {
  try {
    const { user_id } = req.query;
    console.log("i'm here 0: ", user_id);
    const investments = await db('investments')
      .where({ user_id })
      .whereNull('deleted_at');
    res.status(200).json(investments);
  }
  catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createInvestment = async (req, res) => {
  try {
    await db.raw('PRAGMA foreign_keys = ON;');
    const newInvestment = {
      id: uuidv4(),
      ...req.body
    };
    await db('investments').insert(newInvestment);
    res.status(200).json(newInvestment);
  } 
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const deleteInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    await db.raw('PRAGMA foreign_keys = ON;');
    const deletedItemCount = await db('investments').where({ id }).del();
    res.status(200).json({ deletedItemCount });
  } 
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};