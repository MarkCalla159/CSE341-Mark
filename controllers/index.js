const getName = (req, res) =>{
    res.send('Christian Calla');
};

const awesomeperson = (req, res) =>{
    res.json('awesome person');
};

module.exports = { awesomeperson, getName };