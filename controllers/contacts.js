/*nst getName = (req, res) =>{
    res.send('Christian Calla');
};

const awesomeperson = (req, res) =>{
    res.json('awesome person');
};

module.exports = { awesomeperson, getName };*/
const mongodb = require('../database/connectdb');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
//const userId = ObjectId.createFromTime();
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    if (lists.length > 0) {
        res.status(200).json(lists[0]); 
      } else {
        res.status(404).json({ message: "Contacto no encontrado" });
      }
  });
};

module.exports = { getAll, getSingle };