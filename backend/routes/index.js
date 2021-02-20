const router = require('express').Router();
const { validateUser, validateUserRegister } = require('../middlewares/celebrateValidation');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users.js');

const auth = require('../middlewares/auth');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.post('/signup', validateUserRegister, createUser);
router.post('/signin', validateUser, login);

module.exports = router;
