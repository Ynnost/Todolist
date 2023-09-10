import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {v1} from "uuid";
import Button from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    // todolist: Array<TodolistType>
    // removeTask: (taskId: number) => void
    // changeFilter: (value: FilterValuesType) => void
    // deleteAllTasks:()=>void
    // changeTaskStatus: (taskId: string, isDone: boolean) => void
}


export function Todolist(props: PropsType) {

    let [tasks, setTasks] = useState(props.tasks)
    let [filter, setFilter] = useState<FilterValuesType>("all");
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    // let [todolist, setTodolist] = useState(props.todolist)
    // let [activeButton, setActiveButton] = useState('')

    const deleteAllTasks = () => {
        setTasks([])
    }

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    const colanderFoo = () => {
        let tasksForTodolist = tasks
        if (filter === "three") {
            tasksForTodolist = tasks.filter((t, i) => i < 4);
        }
        if (filter === "active") {
            tasksForTodolist = tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.isDone);
        }
        return tasksForTodolist
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        if (title.trim() !== "") {
            let newTak = {id: v1(), title: title.trim(), isDone: false}
            setTasks([newTak, ...tasks])
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        addTask(title)
        setTitle('')
    }

    const onKeyPressHandlerList = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        setTasks(colanderFoo().map(el => el.id === taskId ? {...el, isDone} : el))
        console.log(isDone)
    }


    const onChangeIsDaneHandler = (tID: string, checked: boolean) => {
        changeStatus(tID, checked)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onKeyDown={onKeyPressHandlerList}
                   onChange={onChangeHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTaskHandler}>+
            </button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {colanderFoo().map(t => {
                return (<li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={(e) => onChangeIsDaneHandler(t.id, e.currentTarget.checked)}/>
                    <span>{t.title}</span>
                    <button onClick={() => removeTask(t.id)}>x</button>
                </li>)
            })}
        </ul>
        <div>
            <button onClick={deleteAllTasks}>DeleteAll</button>
        </div>
        <div>
            <Button active={filter === "three"} name={'Give me the first three'} callback={() => {
                changeFilter("three")
            }}/>
            <Button active={filter === "all"} name={'All'} callback={() => {
                changeFilter("all")
            }}/>
            <Button active={filter === "active"} name={'Active'} callback={() => {
                changeFilter("active")
            }}/>
            <Button active={filter === "completed"} name={'Completed'} callback={() => {
                changeFilter("completed")
            }}/>
        </div>
    </div>
}


// const changeFilter = (todolistID: string, value: FilterValuesType) => {
//     setFilter(value)
//     // setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
// }

// const colanderFoo = () => {
//     let tasksForTodolist = tasks.filter((t,i)=>{
//         if (filter === "three") return i < 4
//         if (filter === "active") return !t.isDone
//         if (filter === "completed") return t.isDone
//     });
//     // if (filter === "three") {
//     //     tasksForTodolist = tasks.filter((t, i) => i < 4);
//     // }
//     // if (filter === "active") {
//     //     tasksForTodolist = tasks.filter(t => !t.isDone);
//     // }
//     // if (filter === "completed") {
//     //     tasksForTodolist = tasks.filter(t => t.isDone);
//     // }
//     return tasks
// }