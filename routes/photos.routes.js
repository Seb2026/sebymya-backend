const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Photo = require("../models/Photo.model");
const User = require("../models/User.model");

router.post("/photos", (req, res, next) => {
  const { year, imageUrl } = req.body;
  Photo.create({
    year,
    imageUrl,
  })
    .then((res) => {
      res.json(res);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/photogallery", (req, res, next) => {
  Photo.find()
    .populate("userId")
    .then((allThePhotos) => {
      res.json(allThePhotos);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/photos/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Our projects have array of tasks' ids and
  // we can use .populate() method to get the whole task objects
  Photo.findById(req.params.id)
    .populate("userId")
    .then((photo) => {
      res.status(200).json(photo);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/photos/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  PHoto.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `photo with ${req.params.id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
