const express = require('express');
const router = express.Router();

const { protect } = require('../controllers/authController');
const { view, add, remove } = require('../controllers/wishlistController');

router.use(protect);

router.get('/view', view);
router.post('/add', add);
router.delete('/remove/:id', remove)

module.exports = router;