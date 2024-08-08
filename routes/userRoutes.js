const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../controllers/authController');
const { view, remove } = require('../controllers/userController');

router.use(protect, isAdmin);

router.get('/view', view);
router.delete('/remove/:id', remove)

module.exports = router;