exports.apiError = (req, res) => {
  res.status(500).json({ status: 500, message: "server down" });
};
