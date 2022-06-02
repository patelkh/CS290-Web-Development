import express from 'express';
import * as exercises from './exercises_models.mjs'

const PORT = 3000
const app = express(); 
app.use(express.json());

app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(error => {
            res.status(500).send({error: 'Request Failed'});
        });

});

app.get('/exercises', (req, res) => {
    exercises.findExercise(req.query, '', 0)
    //HTTP Response
    .then(exercise => {
        res.status(200).json(exercise);
    })
    .catch(error => {
        res.status(500).send({error: 'Request Failed'});
    });
});

app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
            } else {
                res.status(500).json({Error: 'Resource not found'});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({Error: 'Request failed'});
        });
});

app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteByID(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(500).json({Error: 'Resource not found'});
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).send({error: 'Request failed'})
    })
})



//Binds and listens for connections on the specified host and port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
