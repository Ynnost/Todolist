import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid'
import Button from "./components/Button";

export type FilterValuesType = "all" | "active" | "completed" | "three";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

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


    let [tasksObj, setTasks] = useState<Record<string, TaskType[]>>({
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

    const addTask = (title: string, todolistID: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistID]
        let newTask = [task, ...tasks];
        tasksObj[todolistID] = newTask;
        setTasks({...tasksObj})
        console.log(tasksObj)
    }

    const removeTodolist = (todolistID: string) => {
        setTodolistS(todolistS.filter(el => el.id !== todolistID))
        delete tasksObj[todolistID]
        console.log(tasksObj)
    }

    const removeTask = (id: string, todolistID: string) => {
        let tasks = tasksObj[todolistID]
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistID] = filteredTasks;
        setTasks({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistID: string) => {
        let tasks = tasksObj[todolistID]
        let task = tasks.find(t=>t.id === taskId)
        if(task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }


    return (
        <div className="App">
            <input/> <Button name={'New Todolist'} callback={() => {
        }}/>
            {todolistS.map(el => {
                return (
                    <Todolist key={el.id}
                              title={el.title}
                              tasks={tasksObj[el.id]}
                              id={el.id}
                              removeTodolist={removeTodolist}
                              addTask={addTask}
                              removeTask={removeTask}
                              changeTaskStatus={changeStatus}
                    />
                )
            })}
        </div>
    );
}

export default App;


