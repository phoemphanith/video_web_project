const express = require("express");
const asyncHandler = require("express-async-handler");

const Report = require("../models/reportModel");

const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const response = await Report.findOne({ videoId: req.params.id });
      res.json(response.reports);
    } catch (error) {
      res.json([]);
    }
  })
);

router.patch(
  "/",
  asyncHandler(async (req, res) => {
    const videoId = req.body.videoId;
    const report = req.body.reports;

    const response = await Report.find({ videoId: videoId });

    if (response === undefined || response.length === 0) {
      const newReport = new Report({
        videoId: videoId,
        reports: [
          {
            userId: report.userId,
            video_problem: report.videoProblem,
            sound_problem: report.soundProblem,
            other_problem: report.otherProblem,
          },
        ],
      });
      try {
        await newReport.save();
        res.json({ message: "Report is completed" });
      } catch (error) {
        throw new Error(`Report fail: ${error}`);
      }
    } else {
      response[0].reports = response[0].reports.push({
        userId: report.userId,
        video_problem: report.videoProblem,
        sound_problem: report.soundProblem,
        other_problem: report.otherProblem,
      });

      try {
        await Report.updateOne(
          { _id: response[0]._id },
          { reports: response[0].reports }
        );
        res.json({ message: "Report is completed" });
      } catch (error) {
        throw new Error(error);
      }
    }
  })
);

module.exports = router;
