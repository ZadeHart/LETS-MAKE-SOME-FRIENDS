import { Router } from 'express';
const router = Router();
import {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    getFriends,
    createFriend,
    deleteFriend
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

// /api/users/:userId
router.route('/:userId/friends').get(getFriends).post(createFriend)

router.route('/:userId/friends/:friendId').delete(deleteFriend)

export default router;
