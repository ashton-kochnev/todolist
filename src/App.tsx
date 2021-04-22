import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | 'completed'| 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "Html", isDone: true},
            {id: v1(), title: "Css", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redax", isDone: false},
            {id: v1(), title: "TypeScript", isDone: true}
        ]
    )

    let [filter, setFilter] = useState<FilterValueType>("all");

    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }

    function changeTaskStatus (taskId: string, newIsDoneValue: boolean) {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks;
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if(filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}

            />
        </div>
    );
}

export default App;
