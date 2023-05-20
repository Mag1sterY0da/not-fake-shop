export const handleServerError = (err, res) => {
  res.status(500).json({ error: err });
};
