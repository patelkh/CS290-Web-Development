import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './pages/Homepage';
import CreateExercise from './pages/CreateExercise';
import EditExercise from './pages/EditExercise';
import {useState} from 'react';


function App() {
 
  const [exerciseToEdit, setExerciseToEdit] = useState([]);
  
  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact><HomePage setExerciseToEdit={setExerciseToEdit}/></Route>
          <Route path="/add-exercise"><CreateExercise/></Route>
          <Route path="/edit-exercise"><EditExercise exerciseToEdit={exerciseToEdit}/></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
