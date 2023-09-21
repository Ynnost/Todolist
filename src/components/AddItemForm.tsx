import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemPropsType = {
    callback: (title: string) => void
}

const AddItemForm = (props: AddItemPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.callback(title.trim())
            console.log(title)
            setTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandlerList = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
            console.log(title)
        }
    }
    return <div>
        <input value={title}
               onKeyDown={onKeyPressHandlerList}
               onChange={onChangeHandler}
               className={error ? "error" : ""}/>
        <button onClick={addTask}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}

export default AddItemForm

