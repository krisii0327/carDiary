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

router.route('/api/listNotes/:id').get(listNotes);
router.route('/api/newNote').post(newNote);
router.route('/api/updateNote').put(updateNote);
router.route('/api/edit/:note_id').get(editSingleNote);
router.route('/api/deleteNote/:note_id').delete(deleteNote);
router.route('/api/deleteNotes/:car_id').delete(deleteNotes);

module.exports = router;
