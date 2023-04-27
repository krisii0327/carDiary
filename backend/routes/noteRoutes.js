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

router.route('/listNotes/:id').get(listNotes);
router.route('/newNote').post(newNote);
router.route('/updateNote').put(updateNote);
router.route('/edit/:note_id').get(editSingleNote);
router.route('/deleteNote/:note_id').delete(deleteNote);
router.route('/deleteNotes/:car_id').delete(deleteNotes);

module.exports = router;
