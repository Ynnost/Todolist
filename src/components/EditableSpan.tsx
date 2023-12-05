import { ChangeEvent, memo, useState } from "react";

type PropsType = {
  oldTitle: string;
  onChange: (newTitle: string) => void;
};

export const EditableSpan = memo((props: PropsType) => {
  console.log("EditableSpan");

  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(props.oldTitle);

  const editHandler = () => {
    setEdit(!edit);
    if (edit) {
      updateTitle();
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const updateTitle = () => {
    props.onChange(newTitle);
  };

  return edit ? (
    <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler} />
  ) : (
    <span onDoubleClick={editHandler}>{props.oldTitle}</span>
  );
});
