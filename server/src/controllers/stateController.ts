import { Request, Response } from 'express';
import { State } from '../models/stateModel';

export const createState = async (req: Request, res: Response) => {
  const { name, description, status, createdBy } = req.body;
  const newState = new State({ name, description, status, createdBy });
  await newState.save();
  res.status(201).json(newState);
};

export const getStates = async (req: Request, res: Response) => {
  const states = await State.find();
  res.status(200).json(states);
};

export const getStateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const state = await State.findById(id);
  if (!state) {
    return res.status(404).json({ message: 'State not found' });
  }
  res.status(200).json(state);
};

export const updateState = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, status, updatedAt } = req.body;
  const updatedState = await State.findByIdAndUpdate(id, { name, description, status, updatedAt: new Date() }, { new: true });
  if (!updatedState) {
    return res.status(404).json({ message: 'State not found' });
  }
  res.status(200).json(updatedState);
};

export const deleteState = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedState = await State.findByIdAndDelete(id);
  if (!deletedState) {
    return res.status(404).json({ message: 'State not found' });
  }
  res.status(200).json({ message: 'State deleted successfully' });
};
