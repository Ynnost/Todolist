import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent } from "react";

type PropsType = {
  isDone: boolean;
  callback: (checked: boolean) => void;
};

export const SuperCheckbox = (props:PropsType) => {

const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.callback(e.currentTarget.checked);
  };

  return (
    <Checkbox checked={props.isDone} onChange={onChangeHandler}  />
  );
};
