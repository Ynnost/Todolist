import { action } from '@storybook/addon-actions'
import { AddItemForm } from "../../components/AddItemForm";

export default {
  title:'AddItemForm Component',
  component:AddItemForm
}

const callback = action("Button 'add' was pressed inside the form");

export const AddItemFormBaseExapmle = (props:any)=>{
  return <AddItemForm callback={callback}/>
}