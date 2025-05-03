const express =require('express');
const router = express.Router();

const contactControl = require('../controllers/contacts');

router.get('/', contactControl.getAll);

router.get('/:id', contactControl.getSingle);

module.exports = router;