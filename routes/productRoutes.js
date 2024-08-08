const express = require('express');
const router = express.Router();

const { protect } = require('../controllers/authController');
const { view, add, owner, update, remove } = require('../controllers/productController');


router.get('/view', view);

router.use(protect);
router.post('/add', add);

router.put('/update/:id', owner, update);
router.delete('/remove/:id', owner, remove)

module.exports = router;