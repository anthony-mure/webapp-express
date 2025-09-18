//importiamo la connessione
const connection = require('../data/db');

//rotta index
const index = (req, res) =>{

  console.log('Metodo index')

};

//rotta show
const show = (req, res) =>{

  console.log('Metodo show')

};

//esportiamo l'oggetto
module.exports = {
  
  index,
  show

};