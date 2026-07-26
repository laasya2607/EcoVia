const express = require("express");
const router = express.Router();

router.post("/search", async (req, res) => {
  const { source, destination, mode } = req.body;

  if (!source || !destination) {
    return res.status(400).json({
      message: "Source and Destination are required",
    });
  }

  const routes = [
    {
      id: 1,
      type: "Healthy",
      score: 91,
      time: "18 min",
      distance: "4.8 km",
      points: [
        "Better Air Quality",
        "More Trees",
        "Low Pollution",
      ],
    },
    {
      id: 2,
      type: "Safe",
      score: 88,
      time: "20 min",
      distance: "5.0 km",
      points: [
        "Better Lighting",
        "Crowded Streets",
        "Low Crime Zone",
      ],
    },
    {
      id: 3,
      type: "Cool",
      score: 95,
      time: "21 min",
      distance: "5.2 km",
      points: [
        "More Shade",
        "Cooler Roads",
        "Less Heat Exposure",
      ],
    },
    {
      id: 4,
      type: "Fast",
      score: 75,
      time: "15 min",
      distance: "4.3 km",
      points: [
        "Shortest Distance",
        "Minimum Time",
        "Moderate Traffic",
      ],
    },
  ];

  res.json(routes);
});

module.exports = router;