import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid'

export type FilterValuesType = "all" | "active" | "completed" | "three";

function App() {

    let tasks =[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ];



    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks}/>
        </div>
    );
}

export default App;


// let [tasks, setTasks] = useState([
//     {id: v1(), title: "HTML&CSS", isDone: true},
//     {id: v1(), title: "JS", isDone: true},
//     {id: v1(), title: "ReactJS", isDone: false},
//     {id: v1(), title: "Rest API", isDone: false},
//     {id: v1(), title: "GraphQL", isDone: false},
// ]);