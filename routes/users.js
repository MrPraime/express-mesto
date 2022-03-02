const router = require('express').Router();
const { userValidation, profileUpdateValidation, avatarUpdateValidation } = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  updateAvatar,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', userValidation, getUser);
router.patch('/me', profileUpdateValidation, updateUser);
router.patch('/me/avatar', avatarUpdateValidation, updateAvatar);

module.exports = router;
