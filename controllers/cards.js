const Cards = require('../models/card');

const getCards = (req, res) => {
  const { cardList } = {};

  return Cards.find(cardList)
  .then((cards) => res.status(200).send(cards))
  .catch(() => {
    res.status(404).send({ message: 'Карточка не найден' });
  });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  return Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь не найдена' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const delCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь не найдена' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь не найдена' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные'});
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь не найдена' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};



module.exports = {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
}