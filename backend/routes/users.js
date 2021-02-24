const router = require('express').Router();
const { validateUserId } = require('../middlewares/celebrateValidation');
const {
  getUsers, getUser, getUserById,
} = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/me', validateUserId, getUser);
router.get('/:id', validateUserId, getUserById);

module.exports = router;
