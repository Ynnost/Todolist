import React from 'react';
import {FilterValuesType} from "../App";

type PropsType = {
    name: string
    callback: () => void
    activeTab?:FilterValuesType
    // type:FilterValuesType
    active: boolean
}


const Button = (props: PropsType) => {

    const onClickHandler = () => {
        props.callback()
    }


    return (

        <button className={props.active ? 'active-filter' : ''}
                onClick={onClickHandler}>{props.name}</button>
    );
};

export default Button;
