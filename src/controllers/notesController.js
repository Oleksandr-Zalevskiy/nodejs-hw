export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const filter = { userId: req.user._id };

  if (tag) filter.tag = tag;
  if (search) filter.$text = { $search: search };

  const skip = (page - 1) * perPage;

  const [notes, total] = await Promise.all([
    Note.find(filter).skip(skip).limit(perPage),
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
