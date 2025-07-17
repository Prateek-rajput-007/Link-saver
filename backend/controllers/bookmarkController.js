const axios = require('axios');
const sanitizeHtml = require('sanitize-html');
const Bookmark = require('../models/bookmark.model');

const saveBookmark = async (req, res) => {
  try {
    const { url, tags } = req.body;
    const userId = req.user.id;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ message: 'Valid URL is required' });
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      return res.status(400).json({ message: 'Invalid URL format' });
    }

  
    const [pageResponse, jinaResponse] = await Promise.all([
      axios.get(url, { timeout: 3000 }).catch((error) => ({
        error,
        data: null,
      })), 
      axios.get(`https://r.jina.ai/${encodeURIComponent(url)}`, {
        headers: process.env.JINA_API_KEY
          ? { 'Authorization': `Bearer ${process.env.JINA_API_KEY}`, 'X-No-Cache': 'true', 'X-With-Generated-Alt': 'true' }
          : { 'X-No-Cache': 'true', 'X-With-Generated-Alt': 'true' },
        timeout: 5000, // 5-second timeout
      }).catch((error) => ({ error })),
    ]);

    let title = 'Untitled';
    let favicon = `${parsedUrl.origin}/favicon.ico`;
    if (pageResponse.data) {
      title = pageResponse.data.match(/<title>(.*?)<\/title>/i)?.[1] || 'Untitled';
    } else {
      console.error('Error fetching title/favicon:', {
        message: pageResponse.error.message,
        code: pageResponse.error.code,
        status: pageResponse.error.response?.status,
      });
    }

    let summary;
    if (jinaResponse.data && typeof jinaResponse.data === 'string') {

      summary = sanitizeHtml(jinaResponse.data, {
        allowedTags: [], 
        allowedAttributes: {}, 
        textFilter: (text) => text.replace(/\s+/g, ' ').trim(), 
      }).slice(0, 800);
    } else {
      console.error('Jina AI API error:', {
        message: jinaResponse.error.message,
        code: jinaResponse.error.code,
        status: jinaResponse.error.response?.status,
        details: jinaResponse.error.response?.data,
      });
      return res.status(502).json({ message: 'Failed to fetch summary from Jina AI', error: jinaResponse.error.message });
    }

    const bookmark = new Bookmark({ userId, url, title, favicon, summary, tags });
    await bookmark.save();

    res.status(201).json(bookmark);
  } catch (error) {
    console.error('Save bookmark error:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Failed to save bookmark', error: error.message });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tag } = req.query;
    const query = tag ? { userId, tags: tag } : { userId };
    const bookmarks = await Bookmark.find(query).sort({ order: 1 });
    res.json(bookmarks);
  } catch (error) {
    console.error('Get bookmarks error:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Failed to fetch bookmarks', error: error.message });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    await Bookmark.findByIdAndDelete(id);
    res.json({ message: 'Bookmark deleted' });
  } catch (error) {
    console.error('Delete bookmark error:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Failed to delete bookmark', error: error.message });
  }
};

const updateBookmarkOrder = async (req, res) => {
  try {
    const { bookmarks } = req.body;
    await Promise.all(bookmarks.map(async (bookmark, index) => {
      await Bookmark.findByIdAndUpdate(bookmark._id, { $set: { order: index } });
    }));
    res.json({ message: 'Order updated' });
  } catch (error) {
    console.error('Update bookmark order error:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

module.exports = { saveBookmark, getBookmarks, deleteBookmark, updateBookmarkOrder };