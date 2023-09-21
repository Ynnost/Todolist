import React, {useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import Button from "./components/Button";
import AddItemForm from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";



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

    const addTaskHandler = (title: string)=>{
     props.addTask(title, props.id)
    }


    return <div>
        <h3>{props.title}
            <Button name={'X'} callback={() => props.removeTodolist(props.id)}/>
        </h3>
            <AddItemForm  callback={addTaskHandler}/>
        <ul>
            {colanderFoo().map(t => {
                return (<li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}/>
                    {/*<span>{t.title}</span>*/}
                    <EditableSpan aldTitle={t.title}/>
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
