import AppWithRedux from "../../components/WithRedux/AppWithRedux";
import { Provider } from "react-redux";
import { store } from "../../state/store";
import { ReduxStoreProvaiderDecorator } from "../ReduxStoreProvaiderDecorator";

export default {
  title: "AppWithRedux Component",
  component: AppWithRedux,
  decorators: [ReduxStoreProvaiderDecorator],
};

//const callback = action("Button 'add' was pressed inside the form");

export const AppWithReduxBaseExapmle = (props: any) => {
  return <AppWithRedux />;
};
