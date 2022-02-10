const router = require('express').Router();

const {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/cards ', createCard);
router.delete('/:id', delCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);



module.exports = router;