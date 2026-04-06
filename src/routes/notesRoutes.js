import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import isValidId from '../middlewares/isValidId.js';

const notesRouter = Router();

notesRouter.use(authenticate);

notesRouter.get('/', getAllNotes);
notesRouter.get('/:noteId', isValidId, getNoteById);
notesRouter.post('/', createNote);
notesRouter.patch('/:noteId', isValidId, updateNote);
notesRouter.delete('/:noteId', isValidId, deleteNote);

export default notesRouter;
