export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "loading" as RequestStatusType,
};

type InitalStateType = typeof initialState;

export type SetStatusACType = ReturnType<typeof setStatusAC>;

export const appReducer = (state: InitalStateType = initialState, action: ActionsType): InitalStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export const setStatusAC = (status: RequestStatusType) =>
  ({
    type: "APP/SET-STATUS",
    status,
  } as const);

type ActionsType = SetStatusACType;
