import mongoose from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { noteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return next(createHttpError(404, 'Note not found'));
  }

  next();
};

export default isValidId;
