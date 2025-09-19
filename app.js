//importo express
const express = require('express');

//importo il pacchetto cors
const cors = require('cors');

//importo il middlewares errorsHandler
const errorsHandler = require('./middlewares/errorsHandler');

//importo il middlewares notFound
const notFound = require('./middlewares/notFound');

//creo l'istanza dell'app attraverso il metodo express che ho importato
const app = express();

//definisco il numero di porta su cui deve girare l'applicazione
const port = process.env.DB_PORT;

//importiamo il router
const moviesRouter = require("./routers/moviesRouter");

app.use(express.static('public'));

//definisco la rotta base
app.get("/", (req, res) =>{

  res.send("Rotta base dei miei film ")

});

//definisco le rotte per i film
app.use("/movies", moviesRouter);

//uso il middlewatres errorsHandler
app.use(errorsHandler);

//uso il middlewares notFound
app.use(notFound);

//registro il middlewares per il cors
app.use(cors({origin: process.env.FE_APP}));

//dico al server di rimanere in ascolto sulla porta 3000
app.listen(port, () =>{

  console.log(`Server in ascolto sulla porta ${port}`)

});

