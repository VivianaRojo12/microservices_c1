import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

var app = express();
const port = 3000
const API = "https://swapi.dev/api/people/"
const ruta = express.Router();

app.use(cors()); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const my_route = ruta.get("/:id", (req,res)=>{
    let id = req.params.id;
    fetch(`${API}/${id}`)
    .then(promesaFetch => promesaFetch.json())
    .then(async contenido => {
        let films = contenido['films']
        let new_films = []
        for(let i=0;i<films.length;i++){
            await fetch(`${films[i]}`)
            .then(new_promesaFetch => new_promesaFetch.json())
            .then(new_contenido => {
                new_films.push(new_contenido['title']);
            })
        }
        res.send({'Peliculas':new_films})
    });
});

app.use("/star-wars",my_route);
app.get('/', (req,res)=>{
    res.send({"message":"Obteniendo películas"})
});

app.listen(port, function () {
    console.log(`Servidor corriendo en el puerto ${port}`)
  });