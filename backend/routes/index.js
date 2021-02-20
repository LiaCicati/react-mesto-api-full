const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users.js');

const auth = require('../middlewares/auth');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
