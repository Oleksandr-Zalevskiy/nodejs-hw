import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

import { someValidator } from '../validations/noteValidation.js';
import {
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
} from '../validations/noteValidation.js';

const router = Router();

router.use(authenticate);

router.get('/', getAllNotes);

router.get(
  '/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  getNoteById,
);

router.post('/', celebrate({ [Segments.BODY]: createNoteSchema }), createNote);

router.patch(
  '/:noteId',
  celebrate({
    [Segments.PARAMS]: noteIdSchema,
    [Segments.BODY]: updateNoteSchema,
  }),
  updateNote,
);

router.delete(
  '/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  deleteNote,
);

export default router;
