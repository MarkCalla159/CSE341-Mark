/*nst getName = (req, res) =>{
    res.send('Christian Calla');
};

const awesomeperson = (req, res) =>{
    res.json('awesome person');
};

module.exports = { awesomeperson, getName };*/
const mongodb = require('../database/connectdb');
const ObjectId = require('mongodb').ObjectId;
/******************************************
 * All Contacts
 *******************************************/
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};
/******************************************
 * Single Contact
 *******************************************/
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  //const userId = ObjectId.createFromTime();
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    if (lists.length > 0) {
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: 'Contacto no encontrado' });
    }
  });
};
/******************************************
 * Create a new Contact
 *******************************************/
const createContact = async (req, res, next) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};
/******************************************
 * Update Contact Info
 *******************************************/
const updateContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

/******************************************
 * Delete Contact
 *******************************************/
const deleteContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
