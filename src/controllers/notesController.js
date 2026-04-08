import createError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const filter = { userId: req.user._id };

  if (tag) filter.tag = tag;
  if (search) filter.$text = { $search: search };

  const skip = (page - 1) * perPage;

  const [notes, total] = await Promise.all([
    Note.find(filter).skip(skip).limit(Number(perPage)),
    Note.countDocuments(filter),
  ]);

  res.json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes: total,
    totalPages: Math.ceil(total / perPage),
    notes,
  });
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOne({ _id: noteId, userId: req.user._id });

  if (!note) {
    return next(createError(404, 'Note not found'));
  }

  res.json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    { returnDocument: 'after' },
  );

  if (!note) {
    return next(createError(404, 'Note not found'));
  }

  res.json(note);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    return next(createError(404, 'Note not found'));
  }

  res.status(200).json(note);
};
