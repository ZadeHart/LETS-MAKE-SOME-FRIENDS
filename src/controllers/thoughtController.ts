import { Request, Response } from 'express';
import models from '../models/index.js';
// import Thought from '../models/index.js';
// import Reaction from '../models/index.js';
// Course = Thought. Student = Reaction

/**
 * GET All Courses /courses
 * @returns an array of Courses
*/
export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await models.Thought.find();
        res.json(thoughts);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const user = await models.Thought.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  /**
 * POST Course /courses
 * @param object username
 * @returns a single Course object
*/
export const createThought = async (req: Request, res: Response) => {
    const { thought } = req.body;
    try {
      const newThought = await models.Thought.create({
        thought
      });
      res.status(201).json(newThought);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT Course based on id /courses/:id
 * @param object id, username
 * @returns a single Course object
*/
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await models.Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  /**
 * DELETE Course based on id /courses/:id
 * @param string id
 * @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await models.Thought.findOneAndDelete({ _id: req.params.thoughtId});
      
      if(!thought) {
        res.status(404).json({
          message: 'No thought with that ID'
        });
      } else {
        await models.Thought.deleteMany({ _id: { $in: thought.reactions } });
        res.json({ message: 'Thought and reactions deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  export const createReaction = async (req: Request, res: Response) => {
    const { reaction } = req.body;
    try {
      const newReaction = await models.Thought.create({
        reaction
      });
      res.status(201).json(newReaction);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  export const deleteReaction = async (req: Request, res: Response) => {
    try {
      const reaction = await models.Thought.findOneAndDelete({ _id: req.params.thoughtId});
      
      if(!reaction) {
        res.status(404).json({
          message: 'No thought with that ID'
        });
      } else {
        await models.Thought.deleteMany({ _id: { $in: reaction } });
        res.json({ message: 'Thought and reactions deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
