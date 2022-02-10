const User = require('../models/user');

const getUsers = (req, res) => {
  const { userList } = {};

  return User.find(userList)
  .then((users) => res.status(200).send(users))
  .catch(() => {
    res.status(404).send({ message: 'Пользователь не найден' });
  });
};


const getUser = (req, res) => {
  const { id } = req.params;
  return User.findById(id)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные'});
    } else if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    }
  });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
  .then((user) => res.status(200).send(user)) .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя'});
    } else if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    }
  });
};


const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
  .then((user) => res.status(200).send(user)) .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара'});
    } else if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    }
  });
}


const updateUser = (req, res) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })

    .then((user) => res.status(200).send(user)) .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля'});
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });

};



module.exports = {
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  updateUser
}