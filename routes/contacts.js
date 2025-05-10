const express = require('express');
const router = express.Router();

const contactControl = require('../controllers/contacts');
//const { route } = require('./contacts');

// To get all contacts
router.get('/', contactControl.getAll);
//To get single contact by ID
router.get('/:id', contactControl.getSingle);
//To create a contact
router.post('/', contactControl.createContact);
//To update a contact info
router.put('/:id', contactControl.updateContact);
//To delete a contact
router.delete('/:id', contactControl.deleteContact);

module.exports = router;
