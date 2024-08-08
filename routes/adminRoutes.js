const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../controllers/authController');
const { view, add, update, remove } = require('../controllers/adminController');

router.use(protect, isAdmin);

router.get('/view', view);
router.post('/add', add);
router.put('/update/:id', update);
router.delete('/remove/:id', remove)

module.exports = router;