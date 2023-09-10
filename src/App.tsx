import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid'

export type FilterValuesType = "all" | "active" | "completed" | "three";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolistS, setTodolistS] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: 'all'},
        {id: todolistID2, title: "What to buy", filter: 'all'}
    ])


    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })


    return (
        <div className="App">
            {todolistS.map(el => {
                return (
                    <Todolist key={el.id} title={el.title} tasks={tasks[el.id]}/>
                )
            })}
        </div>
    );
}

export default App;


