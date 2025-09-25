//importiamo la connessione
const connection = require('../data/db');

//rotta index
const index = (req, res) =>{

  //creo la query
  const sql = "SELECT * FROM movies";
  
  //eseguo la query
  connection.query(sql, (err, results) =>{

    if(err) return res.status(500).json({error: `Errore nell'esecuzione della query: ${err}`})

    const movies = results.map(movie =>{

      return {
        ...movie,
        image: req.imagePath + movie.image

      }
        
    })

    res.send(movies);  

  });

};

//rotta show
const show = (req, res) =>{

  //recupero il paramentro id
  const { id } = req.params;

  //creo la query per il libro
  const sqlMovie = `
      SELECT movies. * ,ROUND(AVG(reviews.vote)) AS avarage_vote
      FROM movies 
      LEFT JOIN reviews ON reviews.movie_id = movies.id
      WHERE movies.id = ?
      GROUP BY movies.id
    `;

  //creo la query per le recensioni
  const sqlReviews = "SELECT * FROM reviews WHERE movie_id = ?";

  //eseguo la query passando i paramentri
  connection.query(sqlMovie, [id], (err, resultMovie) =>{

    if(err) return res.status(500).json({ error: `Errore nell'esecuzione della query: ${err}`})

    //controllo se non ho trovato il film
    if(resultMovie.length === 0 || resultMovie[0].id === null ) return res.status(404).json({ error: `Film non trovato`}); 

     const movie = resultMovie[0]
     movie.image = req.imagePath + movie.image;
     movie.avarage_vote = parseInt(movie.avarage_vote);

     //eseguo la query delle recensioni
     connection.query(sqlReviews, [id], (err, resultReviews) =>{

      if(err) return res.status(500).json({error:`Errore nell'esecuzione della query:${err}`})

        //creo un nuovo oggetto contente i dati di un film e l'array delle sue recensioni
        const movieWithreviews = {

          ...movie,
          reviews: resultReviews

        }

        res.send(movieWithreviews);
     })

  });

};

//rotta store per le reviews
const storeReview = (req, res) => {

  //recupero il paramentro id
  const { id } = req.params;
  const { name, vote, text } = req.body;

  //creo la query per aggiungere una recensione
  const sqlReview = `
    INSERT INTO reviews (movie_id, name, vote, text)
    VALUES (?, ?, ?, ?)
  `;
  
  //eseguo la query per creare una recensione
  connection.query(sqlReview, [id, name, vote, text], (err, result) => {
    if (err) {
      return res.status(500).json({ result: true, message: `Errore nel salvataggio: ${err}` });
    }

    res.status(201).json({ result: false, message: 'Recensione salvata con successo' });
  
  }); 
};   

//esportiamo l'oggetto
module.exports = {

  index,
  show,
  storeReview

};