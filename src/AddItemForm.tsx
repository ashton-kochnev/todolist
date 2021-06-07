import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') addTask()
    }

    const addTask = () => {
        if (newTitle.trim() !== '') {
            props.addItem(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
        <input className={error ? 'error' : ''}
               value={newTitle}
               onChange={onChangeTitle}
               onKeyPress={onKeyPressAddTask}
        />
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}