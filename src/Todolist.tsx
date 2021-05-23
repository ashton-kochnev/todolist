import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (task: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}

function Todolist(props: TodolistPropsType) {
    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>  setNewTitle(e.currentTarget.value)

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') addTask()
    }

    const addTask = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim(), props.id)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onClickAllFilter = () => props.changeFilter('all', props.id)
    const onClickActiveFilter = () => props.changeFilter('active', props.id)
    const onClickCompletedFilter = () => props.changeFilter('completed', props.id)

    const removeTodolist = () => props.removeTodolist(props.id)

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={newTitle}
                       onChange={onChangeTitle}
                       onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                                <input
                                    onChange={(e) =>
                                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
                                    type="checkbox"
                                    checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
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