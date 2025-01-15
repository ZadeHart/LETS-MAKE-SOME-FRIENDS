import { Request, Response } from 'express';
// import User from '../models/index.js';
import models from '../models/index.js';
// import Friend from '../models/index.js';

console.log('Model User', models.User)

  // Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await models.User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get a single user
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await models.User.findOne({ _id: req.params.userId })
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

  // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await models.User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const updateUser = async (req: Request, res: Response) => {
      try {
        const course = await models.User.findOneAndUpdate(
          { _id: req.params.courseId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!course) {
          res.status(404).json({ message: 'No course with this id!' });
        }
  
        res.json(course)
      } catch (error: any) {
        res.status(400).json({
          message: error.message
        });
      }
    };
  
  // Delete a user and associated apps
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await models.User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await models.User.deleteMany({ _id: { $in: user } });
      res.json({ message: 'User and associated apps deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // export const createFriend = async (req: Request, res: Response) => {
  //   try {
  //     const friend = await models.Friend.create(req.body);
  //     res.json(friend);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }

  // export const deleteFriend = async (req: Request, res: Response) => {
  //   try {
  //     const friend = await models.Friend.findOneAndDelete({ _id: req.params.userId });

  //     if (!friend) {
  //       return res.status(404).json({ message: 'No user with that ID' });
  //     }

  //     await models.Friend.deleteMany({ _id: { $in: friend.Friend } });
  //     res.json({ message: 'User and associated apps deleted!' })
  //     return;
  //   } catch (err) {
  //     res.status(500).json(err);
  //     return;
  //   }
  // }
