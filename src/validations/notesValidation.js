import Joi from 'joi';

export const getAllNotesSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  perPage: Joi.number().min(1).max(100).default(10),
  tag: Joi.string(),
  search: Joi.string(),
});

export const noteIdSchema = Joi.object({
  noteId: Joi.string().length(24).hex().required(),
});

export const createNoteSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  content: Joi.string().allow('').default(''),
  tag: Joi.string(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  content: Joi.string().allow(''),
  tag: Joi.string(),
}).min(1);
