const router = require('express').Router();
const { validateCard, validateСardId } = require('../middlewares/celebrateValidation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:cardId', validateСardId, deleteCard);
router.put('/:cardId/likes', validateСardId, likeCard);
router.delete('/:cardId/likes', validateСardId, dislikeCard);

module.exports = router;
