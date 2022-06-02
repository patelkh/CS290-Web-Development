import { json } from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/user_db', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection; 

db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');});

mongoose.set('useCreateIndex', true);


const exercisesSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true}, 
    date: {type: String, required: true, } 
})

const Exercises = mongoose.model("Exercises", exercisesSchema)

const createExercise = async(name, reps, weight, unit, date) => {
    const exercise = new Exercises({name: name, reps: reps, weight: weight, unit: unit, date: date})
    return exercise.save()
}

//Returns documents 
const findExercise = async (filter, projection, limit) => {
    const query = Exercises.find(filter)
            .select(projection)
            .limit(limit);
    return query.exec();
}

//Edits document
const replaceExercise = async(_id, body) => {
    // const doc = await Exercises.findById(_id)
    
    // let update = {}

    // if (body.name !== undefined) {
    //     Object.assign(update, {name: body.name})
    // } else Object.assign(update, {name: doc.name})

    // if (body.reps !== undefined) {
    //     Object.assign(update, {reps: parseInt(body.reps)})
    // } else Object.assign(update, {reps: parseInt(doc.reps)})

    // if (body.weight !== undefined) {
    //     Object.assign(update, {weight: parseInt(body.weight)})
    // } else Object.assign(update, {weight: parseInt(doc.weight)})

    // if (body.unit !== undefined) {
    //     Object.assign(update, {unit: body.unit})
    // } else Object.assign(update, {unit: doc.unit})

    // if (body.date !== undefined) {
    //     Object.assign(update, {date: body.date})
    // } else Object.assign(update, {date: doc.date})

    const result = await Exercises.replaceOne({_id: _id}, body);
    return result.nModified;
}

const deleteByID = async (_id) => {
    const result = await Exercises.deleteOne({_id: _id});
    return result.deletedCount;
}

export {createExercise, findExercise, replaceExercise, deleteByID};
