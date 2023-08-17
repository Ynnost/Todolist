import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid'

export type FilterValuesType = "all" | "active" | "completed" | "three";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);


    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
        };
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} changeTaskStatus={changeStatus}/>
        </div>
    );
}

export default App;





















//-------------------------------------------------------------------------

// removeTask={removeTask}
// changeFilter={changeFilter}
// deleteAllTasks={deleteAllTasks}
// import React, {useState} from 'react';
// import './App.css';
// import {Todolist} from './Todolist';
//
//
// export type FilterValuesType = "all" | "active" | "completed" | "three";
//
// function App() {
//
//     let [tasks, setTasks] = useState([
//         {id: 1, title: "HTML&CSS", isDone: true},
//         {id: 2, title: "JS", isDone: true},
//         {id: 3, title: "ReactJS", isDone: false},
//         {id: 4, title: "Rest API", isDone: false},
//         {id: 5, title: "GraphQL", isDone: false},
//     ]);
//
//     const deleteAllTasks = () => {
//         setTasks([])
//     }
//
//     function removeTask(id: number) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//
//     // let [filter, setFilter] = useState<FilterValuesType>("all");
//     //
//     // let tasksForTodolist = tasks;
//     //
//     // if (filter === "active") {
//     //     tasksForTodolist = tasks.filter(t => t.isDone === false);
//     // }
//     // if (filter === "completed") {
//     //     tasksForTodolist = tasks.filter(t => t.isDone === true);
//     // }
//     //
//     // function changeFilter(value: FilterValuesType) {
//     //     setFilter(value);
//     // }
//
//     return (
//         <div className="App">
//             <Todolist
//                 title="What to learn"
//                 tasks={tasks}
//                 removeTask={removeTask}
//                 //changeFilter={changeFilter}
//                 deleteAllTasks={deleteAllTasks}
//
//             />
//         </div>
//     );
// }
//
// export default App;

// const deleteAllTasks = () => {
//     setTasks([])
// }
//
//
// function removeTask(id: number) {
//     let filteredTasks = tasks.filter(t => t.id != id);
//     setTasks(filteredTasks);
// }
//
// let [filter, setFilter] = useState<FilterValuesType>("all");
//
// let tasksForTodolist = tasks;
//
// if (filter === "active") {
//     tasksForTodolist = tasks.filter(t => t.isDone === false);
// }
// if (filter === "completed") {
//     tasksForTodolist = tasks.filter(t => t.isDone === true);
// }
//
// function changeFilter(value: FilterValuesType) {
//     setFilter(value);
// }
