const router = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  updateUser
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);



module.exports = router;