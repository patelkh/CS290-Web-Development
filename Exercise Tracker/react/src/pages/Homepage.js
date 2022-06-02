import React from 'react';
import {useState, useEffect} from 'react';
import ExerciseList  from '../components/ExerciseList';
import {useHistory} from 'react-router-dom'

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const loadExercises = async () => {
        const response = await fetch('/exercises', {method: 'GET'});
        const exercises = await response.json();
        setExercises(exercises)
    }

    useEffect(() => {
        loadExercises();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
        setExercises(exercises);

        } else {
        console.error(`Failed to delete movie with id = ${_id}, status code = ${response.status}`)
        }
    }	

    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        history.push("/edit-exercise")
    }

    const redirect = () => {
        history.push('/add-exercise')
    }

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit} ></ExerciseList>
            <p></p>
            <button onClick={redirect}>Add Exercise</button>
        </>
    )
}

export default HomePage; 
