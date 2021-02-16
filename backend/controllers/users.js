const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      res.status(500).send({ message: `Запрашиваемый ресурс не найден ${err}` });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('Не найдено'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Введён неправильный id' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        console.log('Нет пользователя с таким id');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(console.log('Неверно введен id'));
      }
      next(err);
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  if (req.body.password.length < 8) {
    console.log('Ошибка валидации. Пароль должен состоять из 8 или более символов');
  } else {
    bcrypt
      .hash(password.toString(), 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(400).send({ message: 'Ошибка валидации' });
        }
        return res.status(500).send({ message: 'Ошибка сервера' });
      });
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.send({ token });
    })
    .catch(() => next(console.log('Введены неверное имя или пароль')));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  getUserMe,
};
