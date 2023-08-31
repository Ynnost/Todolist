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
    // removeTask: (taskId: number) => void
    // changeFilter: (value: FilterValuesType) => void
    // deleteAllTasks:()=>void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}



export function Todolist(props: PropsType) {

    let [tasks, setTasks] = useState(props.tasks)
    let [filter, setFilter] = useState<FilterValuesType>("all");
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    // let [activeButton, setActiveButton] = useState('')

    const deleteAllTasks = () => {
        setTasks([])
    }

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    const colanderFoo = () => {
        let tasksForTodolist = tasks;
        if (filter === "three") {tasksForTodolist = tasks.filter((t, i) => i < 4);}
        if (filter === "active") {tasksForTodolist = tasks.filter(t => !t.isDone);}
        if (filter === "completed") {tasksForTodolist = tasks.filter(t => t.isDone);}
        return tasksForTodolist
    }

    const changeFilter = (value: FilterValuesType) => {setFilter(value)}



    const addTask = (title: string) => {
        if(title.trim() !== ""){
        let newTak = {id: v1(), title: title.trim(), isDone: false}
        setTasks([newTak, ...tasks])} else {
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


    const onChangeIsDaneHandler = (tID: string, checked:boolean) => {
         props.changeTaskStatus(tID, checked)
    }



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onKeyDown={onKeyPressHandlerList}
                   onChange={onChangeHandler}
            className={error ? "error": ""}/>
            <button onClick={addTaskHandler}>+
            </button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {colanderFoo().map(t => {
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     return props.changeTaskStatus(t.id, e.currentTarget.checked)
                    // }
                    return (<li key={t.id} className={t.isDone ? "is-done": ""}>
                        <input type="checkbox" onChange={(e)=>onChangeIsDaneHandler(t.id,e.currentTarget.checked)}/>
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
                changeFilter("three")}}/>
            <Button active={filter === "all"} name={'All'} callback={() => {
                changeFilter("all")
            }}/>
            <Button active={filter === "active"} name={'Active'} callback={() => {
                changeFilter("active")
            }}/>
            <Button active={filter === "completed"} name={'Completed'} callback={() => {
                changeFilter("completed")
            }}/>

            {/*<button onClick={() => {*/}
            {/*    changeFilter("three")*/}
            {/*}}>Give me the first three*/}
            {/*</button>*/}
            {/*<button onClick={() => {*/}
            {/*    changeFilter("all")*/}
            {/*}}>All*/}
            {/*</button>*/}
            {/*<button onClick={() => {*/}
            {/*    changeFilter("active")*/}
            {/*}}>Active*/}
            {/*</button>*/}
            {/*<button onClick={() => {*/}
            {/*    changeFilter("completed")*/}
            {/*}}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}


//------------------------------------------------------------------------------------------------

// import React, {useState} from 'react';
// import {FilterValuesType} from './App';
//
// type TaskType = {
//     id: number
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: number) => void
//     //changeFilter: (value: FilterValuesType) => void
//     deleteAllTasks:()=>void
// }
//
// export function Todolist(props: PropsType) {
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = props.tasks;
//
//     if (filter === "three") {
//         tasksForTodolist = props.tasks.filter(t => t.id<4);
//     }
//     if (filter === "active") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//     return <div>
//         <h3>{props.title}</h3>
//         <div>
//             <input/>
//             <button>+</button>
//         </div>
//         <ul>
//             {
//                 tasksForTodolist.map(t => <li key={t.id}>
//                     <input type="checkbox" checked={t.isDone}/>
//                     <span>{t.title}</span>
//                     <button onClick={ () => { props.removeTask(t.id) } }>x</button>
//                 </li>)
//             }
//         </ul>
//         <button onClick={()=>props.deleteAllTasks()}>DELETE ALL TASKS</button>
//         <div>
//             <button onClick={ () => { changeFilter("three") } }>
//                 Give me the first three
//             </button>
//             <button onClick={ () => { changeFilter("all") } }>
//                 All
//             </button>
//             <button onClick={ () => { changeFilter("active") } }>
//                 Active
//             </button>
//             <button onClick={ () => { changeFilter("completed") } }>
//                 Completed
//             </button>
//         </div>
//     </div>
// }


// const colanderFoo = () => {
//     let colander = tasks
//     if (globalfilterKey === 'Active') {
//         colander = tasks.filter(el => !el.isDone)
//     } else if (globalfilterKey === 'Completed') {
//         colander = (tasks.filter(el => el.isDone))
//     }
//     return colander
// }

// const colanderFoo = () => {
//     let colander = tasks
//     if (globalfilterKey === 'Active') {
//         colander = tasks.filter(el => !el.isDone)
//     } else if (globalfilterKey === 'Completed') {
//         colander = (tasks.filter(el => el.isDone))
//     }
//     return colander
// }
//
// const removeTask = (tasksId: number) => setTask(tasks.filter(el => el.id !== tasksId))
//
// console.log(removeTask)
//
// const taskMap = colanderFoo().map((el) => {
//     return (
//         <li key={el.id}>
//             <button onClick={()=>removeTask(el.id)}>X</button>
//             <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
//     )
// })

// {
//     colanderFoo().map(t => {
//         const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//             return props.changeTaskStatus(t.id, e.currentTarget.checked)
//             // console.log(`ID = ${t.id} ${e.currentTarget.checked}`)
//         }
//         return (<li key={t.id}>
//             <input type="checkbox"
//                    onChange={onChangeHandler}
//                    checked={t.isDone}/>
//             <span>{t.title}</span>
//             <button onClick={() => {
//                 removeTask(t.id)
//             }}>x
//             </button>
//         </li>)
//     })
// }

// const addTask = (title: string) => {
//     if(title.trim() !== ""){
//         let newTak = {id: v1(), title: title.trim(), isDone: false}
//         setTasks([newTak, ...tasks])} else {
//         setError("Title is required")
//     }
// }