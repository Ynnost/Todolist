import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import Button from "./components/Button";



type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTodolist: (id: string) => void
    id: string
    addTask: (title: string, todolistID:string) => void
    removeTask: (id: string, todolistID:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID:string) => void
}

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<FilterValuesType>("all");

    const colanderFoo = () => {
        let tasksForTodolist = props.tasks
        if (filter === "active") {
            tasksForTodolist = props.tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            tasksForTodolist = props.tasks.filter(t => t.isDone);
        }
        return tasksForTodolist
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    return <div>
        <h3>{props.title}
            <Button name={'X'} callback={() => props.removeTodolist(props.id)}/>
        </h3>
            <AddItemForm id={props.id} addTask={props.addTask}/>
        <ul>
            {colanderFoo().map(t => {
                return (<li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}/>
                    <span>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id, props.id)}>x</button>
                </li>)
            })}
        </ul>
        <div>
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

type AddItemPropsType = {
    addTask: (title: string, todolistID: string) => void
    id: string
}

const AddItemForm = (props: AddItemPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.id)
            console.log(title)
            setTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandlerList = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
            console.log(title)
        }
    }

    return <div>
            <input value={title}
                   onKeyDown={onKeyPressHandlerList}
                   onChange={onChangeHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
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

//
//     const addTask = (title: string, tID: string) => {
//         if (title.trim() !== "") {
//             props.addTask(title.trim(), props.todolistID
//         }
//         setTasks([newTak, ...tasks])
//     }
// else
//     {
//         setError("Title is required")
//     }
// }
//
// const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.currentTarget.value)
// }
//
// const addTaskHandler = () => {
//     addTask(title)
//     setTitle('')
// }

// const onKeyPressHandlerList = (event: KeyboardEvent<HTMLInputElement>) => {
//     setError(null)
//     if (event.key === 'Enter') {
//         addTaskHandler()
//     }
// }