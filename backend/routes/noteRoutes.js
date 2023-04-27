const express = require('express');
const router = express.Router();
const {
  listNotes,
  newNote,
  updateNote,
  editSingleNote,
  deleteNote,
  deleteNotes,
} = require('../controllers/noteController');

router.route('/backend/listNotes/:id').get(listNotes);
router.route('/backend/newNote').post(newNote);
router.route('/backend/updateNote').put(updateNote);
router.route('/backend/edit/:note_id').get(editSingleNote);
router.route('/backend/deleteNote/:note_id').delete(deleteNote);
router.route('/backend/deleteNotes/:car_id').delete(deleteNotes);

module.exports = router;
