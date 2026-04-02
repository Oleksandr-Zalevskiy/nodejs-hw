import express from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotesController,
  getNoteByIdController,
  createNoteController,
  deleteNoteController,
  updateNoteController,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = express.Router();

router.get('/notes', celebrate(getAllNotesSchema), getAllNotesController);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteByIdController);
router.post('/notes', celebrate(createNoteSchema), createNoteController);
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNoteController);
router.patch(
  '/notes/:noteId',
  celebrate(updateNoteSchema),
  updateNoteController,
);

export default router;
