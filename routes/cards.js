const router = require('express').Router();
const { createCardValidation, cardValidation } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:id', cardValidation, delCard);
router.put('/:cardId/likes', cardValidation, likeCard);
router.delete('/:cardId/likes', cardValidation, dislikeCard);

module.exports = router;
