import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotesController = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const filter = {};

  if (tag) {
    filter.tag = tag;
  }

  if (search !== undefined && search !== '') {
    filter.$text = { $search: search };
  }

  const skip = (pageNumber - 1) * perPageNumber;

  const [notes, totalNotes] = await Promise.all([
    Note.find(filter).skip(skip).limit(perPageNumber),
    Note.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalNotes / perPageNumber);

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteByIdController = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNoteController = async (req, res) => {
  const note = await Note.create(req.body);

  res.status(201).json(note);
};

export const deleteNoteController = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const updateNoteController = async (req, res) => {
  const { noteId } = req.params;

  const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
    returnDocument: 'after',
  });

  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updatedNote);
};
