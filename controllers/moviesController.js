//importiamo la connessione
const connection = require('../data/db');

//rotta index
const index = (req, res) =>{

  //creo la query
  const sql = "SELECT * FROM movies";
  
  //eseguo la query
  connection.query(sql, (err, results) =>{

    if(err) return res.status(500).json({error: `Errore nell'esecuzione della query: ${err}`})

    res.send(results);  

  });

};

//rotta show
const show = (req, res) =>{

  //recupero il paramentro id
  const { id } = req.params;

  //creo la query
  const sqlMovie = "SELECT * FROM movies WHERE id = ?";

  //eseguo la query passando i paramentri
  connection.query(sqlMovie, [id], (err, resultMovie) =>{

    if(err) return res.status(500).json({ error: `Errore nell'esecuzione della query: ${err}`})

    //controllo se non ho trovato il libro
    if(resultMovie.length === 0 || resultMovie[0].id === null ) return res.status(404).json({ error: `Film non trovato`}); 

    res.send(resultMovie[0])  

  });

};

//esportiamo l'oggetto
module.exports = {

  index,
  show

};