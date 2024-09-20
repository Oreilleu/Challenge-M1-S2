exports.testController = async (req, res) => {
  try {
    res.json({ success: true, message: "Route de test" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
