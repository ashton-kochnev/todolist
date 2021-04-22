import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    addTask: (title: string) => void
    removeTask: (task: string) => void
    changeFilter: (value: FilterValueType) => void
    changeTaskStatus : (taskId: string, newIsDoneValue: boolean) => void
}

function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(true)
    const tasksJSXElements = props.tasks.map(t => {
        return (
            <li className={t.isDone ? 'isDone' : ''}>
                <input
                    onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked)}
                    type="checkbox"
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTask(t.id)
                }}>x
                </button>
            </li>
        )
    })

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim())
        } else {
            setError(false)
        }
        setTitle('')
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onClickAllFilter = () => props.changeFilter('all')
    const onClickActiveFilter = () => props.changeFilter('active')
    const onClickCompletedFilter = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>{tasksJSXElements}</ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onClickAllFilter}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onClickActiveFilter}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onClickCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;