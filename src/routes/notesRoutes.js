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

router.get('/', celebrate(getAllNotesSchema), getAllNotesController);
router.get('/:noteId', celebrate(noteIdSchema), getNoteByIdController);
router.post('/', celebrate(createNoteSchema), createNoteController);
router.delete('/:noteId', celebrate(noteIdSchema), deleteNoteController);
router.patch('/:noteId', celebrate(updateNoteSchema), updateNoteController);

export default router;
