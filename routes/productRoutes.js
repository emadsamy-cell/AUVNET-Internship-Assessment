const express = require('express');
const router = express.Router();

const { protect } = require('../controllers/authController');
const { view, add, owner, update, remove } = require('../controllers/productController');
const upload = require('../middleware/multer')

router.get('/view', view);

router.use(protect);
router.post('/add', upload.single('image'), add);

router.put('/update/:id', owner, upload.single('image'), update);
router.delete('/remove/:id', owner, remove)

module.exports = router;