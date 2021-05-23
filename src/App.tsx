import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [key: string]: TaskType[]
}

export type FilterValueType = "all" | 'completed' | 'active'

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todoLists, setTodolists] = useState<TodolistType[]>([
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'}
        ]
    )

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "Html", isDone: true},
            {id: v1(), title: "Css", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redax", isDone: false},
            {id: v1(), title: "TypeScript", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "weed", isDone: true},
            {id: v1(), title: "milk", isDone: true},
        ]
    })


    function removeTask(id: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
        // let tasks = tasks[todolistId]
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasks})
        // }
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        setTodolists(todoLists.map(t => t.id === todolistId ? {...t, filter: value} : t))
        // let todolist = todoLists.find(tl => tl.id === todolistId)
        // if (todolist) {
        //     todolist.filter = value
        //     setTodolists([...todoLists])
        // }
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                    />
                })
            }
        </div>
    );
}

export default App;
