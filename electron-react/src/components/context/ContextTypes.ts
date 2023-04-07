import { Dispatch, SetStateAction } from "react"

export interface DetailsContextType {
  compJSX: [string, Dispatch<SetStateAction<string>>],
  compBody:[string, Dispatch<SetStateAction<string>>],
  tempCompBody:[string, Dispatch<SetStateAction<string>>],
  tempCompJSX:[string, Dispatch<SetStateAction<string>>]
}

export interface MockFetchContextType {
  mockServer:[string | null, Dispatch<SetStateAction<string | null>>]
}

export type performanceData = {
  renderName: string,
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
};

export interface PerformanceContextType {
  performanceData: [performanceData[], Dispatch<SetStateAction<performanceData[]>>],
  keyCount: [number, Dispatch<SetStateAction<number>>]
}

export interface ShowUIType {
  showUI: [boolean , Dispatch<SetStateAction<boolean>>] 
}

export interface UserComponent {
  name: string;
}

export interface UserCompType {
  components: PayloadType[];
  dispatch: Function
}

// type Overloading for useReducer Actions: https://stackoverflow.com/questions/73902445/overloading-payload-in-usereducer-hook-typescript
export type UserActionType = {
  type: 'SET_COMPS';
  payload: PayloadType[]
} | {
  type: 'ADD_COMPS' | 'DELETE_COMPS' | 'EDIT_COMPS';
  payload: PayloadType;
}

export interface UserStateType {
  components: PayloadType[];
}

export interface PayloadType {
  name: string,
  jsx: string,
  body: string,
  mockServer: string
}