const express = require('express');
const cors = require('cors')
const port = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const app = express();
app.use(cors());
app.use(express.json())

app.get('/movies', (req, res) => {
    knex
        .select('*')
        .from('movies')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
            );
})

app.post('/newMovie', async (req, res) => {
    const title =  req.body;
     knex
        .insert(title)
        .into('movies')
        .then(async function (data) {
            const result = await knex.select('title').from('movies')
            res.status(201).json({success: true, 'data': result})
        })
})

app.delete('/newMovie', (req, res) => {
    const movie = req.body.id;
    console.log('movie', movie)
    knex('movies')
        .where('id', movie)
        .del()
        .then(async function (data) {
            const result = await knex.select('*').from('movies')
            res.json({success: true, 'data': result})
        })
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
            );
})

app.patch('/movies', (req, res) => {
    const boolean = req.body.watched
    const id = req.body.id
    knex
        .select('watched')
        .from('movies')
        .where('id', id)
        .update('watched', boolean)
        .then(async function (data) {
            const result = await knex.select('*').from('movies').orderBy('id')
            res.json({success: true, 'data': result})
        })
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
            );
})





app.listen(port, () => console.log(`Server listenting on port: ${port}`))