import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: "Html", isDone: true},
            {id: 2, title: "Css", isDone: true},
            {id: 3, title: "React", isDone: false},
            {id: 4, title: "Redax", isDone: false},
            {id: 5, title: "TypeScript", isDone: true}
        ]
    )

    function removeTask(id: number) {
        const filterTasks = tasks.filter(t => t.id !== id)
        console.log(tasks)
        setTasks(filterTasks)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
