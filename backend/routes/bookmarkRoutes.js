const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { saveBookmark, getBookmarks, deleteBookmark, updateBookmarkOrder } = require('../controllers/bookmarkController');

const router = express.Router();

router.use(authMiddleware);
router.post('/', saveBookmark);
router.get('/', getBookmarks);
router.delete('/:id', deleteBookmark);
router.put('/order', updateBookmarkOrder);

module.exports = router;