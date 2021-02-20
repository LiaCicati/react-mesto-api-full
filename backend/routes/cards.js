const router = require('express').Router();
const { validateCard, validateСardId } = require('../middlewares/celebrateValidation');
const { getCards, createCard, deleteCard } = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:cardId', validateСardId, deleteCard);

module.exports = router;
