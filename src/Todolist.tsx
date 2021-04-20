import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (task: string) => void
    changeFilter: (value: FilterValueType) => void
}

function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState('')
    const tasksJSXElements = props.tasks.map(t => {
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTask(t.id)
                }}>x
                </button>
            </li>
        )
    })

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onClickAllFilter = () => props.changeFilter('all')
    const onClickActiveFilter = () => props.changeFilter('active')
    const onClickCompletedFilter = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>{tasksJSXElements}</ul>
            <div>
                <button onClick={onClickAllFilter}>All</button>
                <button onClick={onClickActiveFilter}>Active</button>
                <button onClick={onClickCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;