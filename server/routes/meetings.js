const express = require('express');
const router = express.Router();

const Meeting = require('../models/Meeting');
const Assignment = require('../models/Assignment');

// GET ALL MEETINGS
router.get();

// CREATE A MEETING
router.post();

// GET A MEETING BY ID
router.get();
// UPDATE A MEETING
router.patch();

// DELETE A MEETING
router.delete();

/******* Asignments API *******/

// GET ALL ASSIGNMENTS
router.get()

// CREATE AN ASSIGNMENT
router.post()

// GET ASSIGNMENT BY ID
router.get()
// UPDATE AN ASSIGNMENT
router.patch()

// DELETE AN ASSIGNMENT
router.delete();

module.exports = router;