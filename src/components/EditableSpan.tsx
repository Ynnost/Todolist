import React, {useState} from 'react';


type PropsType = {
    aldTitle: string
}

export const EditableSpan = (props: PropsType) => {

    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        setEdit(!edit)
    }


    return (
        edit ? <input value={props.aldTitle} onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.aldTitle}</span>
    );
};

