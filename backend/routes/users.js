const router = require('express').Router();
const { validateUserId, validateAvatar, validateProfile } = require('../middlewares/celebrateValidation');
const {
  getUsers, getUser, getUserById, updateAvatar, updateUser,
} = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/me', validateUserId, getUser);
router.get('/:id', validateUserId, getUserById);
router.patch('/me', validateProfile, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
