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

// const activeTab = () => {
//     let buttonActive = ''
//      if(props.activeTab === "all"){buttonActive = 'active-filter'} else return


//      && "three" && "active" && "completed" ? buttonActive = 'active-filter' : buttonActive
//     return buttonActive
// }

// const activeTab = (): boolean => {
//
//     switch (props.activeTab) {
//         case 'all':
//             return  true
//         default:
//             return false
//     }
//
//     if(props.activeTab === 'all') {
//         return  true
//     }
//
//     if (props.activeTab === 'three') {
//         return  true
//     }
//
//     return false
// }