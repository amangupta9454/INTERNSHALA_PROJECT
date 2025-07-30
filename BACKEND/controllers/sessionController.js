const Session = require('../models/Session');

exports.getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching public sessions:', error);
    res.status(500).json({ message: 'Server error while fetching public sessions' });
  }
};

exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.userId });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    res.status(500).json({ message: 'Server error while fetching user sessions' });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.user.userId });
    if (!session) {
      return res.status(404).json({ message: 'Session not found or you do not have access' });
    }
    res.json(session);
  } catch (error) {
    console.error(`Error fetching session ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error while fetching session' });
  }
};

exports.saveDraft = async (req, res) => {
  try {
    const { title, tags, json_file_url } = req.body;
    if (!title || !json_file_url) {
      return res.status(400).json({ message: 'Title and JSON file URL are required' });
    }

    const sessionData = {
      user_id: req.user.userId,
      title,
      tags: typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags,
      json_file_url,
      status: 'draft',
      updated_at: Date.now(),
    };

    let session;
    if (req.body._id) {
      session = await Session.findOneAndUpdate(
        { _id: req.body._id, user_id: req.user.userId },
        sessionData,
        { new: true }
      );
      if (!session) {
        return res.status(404).json({ message: 'Session not found or you do not have access' });
      }
    } else {
      session = new Session(sessionData);
      await session.save();
    }

    res.json({ message: 'Draft saved', session });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ message: 'Server error while saving draft' });
  }
};

exports.publishSession = async (req, res) => {
  try {
    const { _id, title, tags, json_file_url } = req.body;
    if (!_id || !title || !json_file_url) {
      return res.status(400).json({ message: 'Session ID, title, and JSON file URL are required' });
    }

    const session = await Session.findOneAndUpdate(
      { _id, user_id: req.user.userId },
      {
        title,
        tags: typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags,
        json_file_url,
        status: 'published',
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: 'Session not found or you do not have access' });
    }

    res.json({ message: 'Session published', session });
  } catch (error) {
    console.error(`Error publishing session ${_id}:`, error);
    res.status(500).json({ message: 'Server error while publishing session' });
  }
};