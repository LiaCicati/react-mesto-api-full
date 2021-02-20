const router = require('express').Router();
const { validateUserId } = require('../middlewares/celebrateValidation');
const {
  getUsers, getUserMe, getUserById,
} = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/me', validateUserId, getUserMe);
router.get('/:id', validateUserId, getUserById);

module.exports = router;
