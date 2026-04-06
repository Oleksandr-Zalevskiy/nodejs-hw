import Joi from 'joi';

export const createNoteSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().allow(''),
  tag: Joi.string(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string().allow(''),
  tag: Joi.string(),
});

export const noteIdSchema = Joi.object({
  noteId: Joi.string().hex().length(24).required(),
});
