const Note = require('../models/Note');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const listNotes = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Note.find({ car: id }));
};

const newNote = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {
    id,
    subject,
    typeOfService,
    kilometer,
    costOfService,
    extraInfo,
    timeOfService,
  } = req.body;

  const noteDoc = await Note.create({
    car: id,
    subject,
    typeOfService,
    kilometer,
    costOfService,
    extraInfo,
    timeOfService,
  });

  res.json(noteDoc);
};

const updateNote = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {
    id,
    note_id,
    subject,
    typeOfService,
    kilometer,
    costOfService,
    extraInfo,
    timeOfService,
  } = req.body;
  const noteDoc = await Note.findById(note_id);
  if (noteDoc) {
    noteDoc.set({
      subject,
      typeOfService,
      kilometer,
      costOfService,
      extraInfo,
      timeOfService,
    });
    await noteDoc.save();
    res.json('updated note');
  }
};

const editSingleNote = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { note_id } = req.params;
  res.json(await Note.findById(note_id));
};

const deleteNote = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { note_id } = req.params;
  res.json(await Note.findByIdAndDelete(note_id));
};

const deleteNotes = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { car_id } = req.params;
  const notesDoc = await Note.find({ car: car_id });
  const notesID = [];

  for (i = 0; i < notesDoc.length; i++) {
    notesID.push(notesDoc[i]._id);
    await Note.findByIdAndDelete(notesDoc[i]._id);
  }

  res.json(notesID);
};

module.exports = {
  listNotes,
  newNote,
  updateNote,
  editSingleNote,
  deleteNote,
  deleteNotes,
};
