import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';


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

    const buttonStyle = {
        maxWidth: "30px",
        maxHeight: "38px",
        minWidth: '30px',
        minHeight: "38px",
    }

    return <div>
        <TextField id="outlined-basic"
                   label={error ? error :"Add new Task"}
                   variant="outlined"
                   size={'small'}
                   value={title}
                   error={!!error}
                   onKeyDown={onKeyPressHandlerList}
                   onChange={onChangeHandler}
                   className={error ? "error" : ""}
        />
        <Button size="small" variant="contained" onClick={addTask}
                style={buttonStyle}>+</Button>
    </div>
}

export default AddItemForm

