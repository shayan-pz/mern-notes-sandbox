// routes/notes.js

const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// POST /notes - create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('🔍 GET /notes route hit');
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error('❌ Error fetching notes:', error); // 👈 This will help us!
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// DELETE /notes/:id - delete a note by ID
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
