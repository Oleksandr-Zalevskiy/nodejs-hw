import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as notesController from '../controllers/notesController.js';
import { authenticate } from '../middleware/authenticate.js';

import {
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
  getAllNotesSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.use(authenticate);

// GET /notes
router.get(
  '/',
  celebrate({ query: getAllNotesSchema }),
  notesController.getAllNotes,
);
router.get(
  '/:noteId',
  celebrate({ params: noteIdSchema }),
  notesController.getNoteById,
);

// POST /notes
router.post(
  '/',
  celebrate({ body: createNoteSchema }),
  notesController.createNote,
);

// PATCH /notes/:noteId
router.patch(
  '/:noteId',
  celebrate({ params: noteIdSchema, body: updateNoteSchema }),
  notesController.updateNote,
);

// DELETE /notes/:noteId
router.delete(
  '/:noteId',
  celebrate({ params: noteIdSchema }),
  notesController.deleteNote,
);

export default router;
