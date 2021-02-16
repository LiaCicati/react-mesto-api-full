const router = require('express').Router();
const {
  getUsers, getUserMe, getUserById,
} = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:id', getUserById);

module.exports = router;
